# Native OMP 18.14.2 input facts (read-only investigation)

## Evidence provenance and limits

Inspected the installed native executable `/Users/mouriya/Library/Application Support/Tern/omp/versions/18.14.2`, without executing it. Its embedded readable JS has original `// packages/.../*.ts` source labels and literal version `18.14.2`. Used `strings -n 1` and marker-bounded awk extraction to preserve short lines/braces. These reports are actual bundled implementation, not reconstructed pseudocode:

- `/tmp/soroi-a0-input-facts-native-source-report.txt` — terminal, stdin buffer, TUI, editor, key bindings.
- `/tmp/soroi-a0-input-facts-custom-editor-source-report.txt` — custom editor/paste queue/native sendability.
- `/tmp/soroi-a0-input-facts-composer-source-report.txt` — composer construction/start.
- `/tmp/soroi-a0-input-facts-interactive-source-report.txt` — interactive bootstrap and input controller.
- `/tmp/soroi-a0-input-facts-cli-source-report.txt` — argv parsing and interactive launch.

Citation syntax below: source label + bundled section-relative line, followed by the physical report line(s). **Bundled line numbers are not original TypeScript line numbers.** Exact matching original 18.14.2 TS checkout was not available locally. Installed npm pi-tui was 18.6.1; local oh-my-pi checkout tui package was 18.12.6, so neither was treated as 18.14.2 authority. The inspected executable is macOS/Unix; the IMG01 Linux executable was not inspected, and platform-specialized native/Rust code is not proven identical by this investigation.

No runtime/reproduction/model/test/build/lint/container/git/GitHub-history operation was performed. No host/product/source changes; only these `/tmp/soroi-a0-input-facts-*` reports.

## 1. Bulk text + one trailing CR is not classified as paste merely because it is long

`packages/tui/src/stdin-buffer.ts`, bundled 21–39 (native report 2175–2193): raw-paste detector counts logical CR/LF breaks (CRLF counts once), and returns true only when it encounters another ordinary character **after at least two breaks**. There is no character-count/~700-byte threshold in this decision.

Bundled 300–319 (native report 2454–2474): an ESC-free CR/LF-bearing read goes into a candidate buffer. If the two-break heuristic is not met, a fixed **10 ms** timer is scheduled (bundled 438–444; report 2592–2598). The timer does not emit paste: it calls the replay branch, which splits sequences and emits ordinary `data` events (bundled 467–486; report 2621–2640).

Therefore a prompt containing only literal JSON backslash-n escapes and **one actual trailing CR** follows ordinary character/key replay, not an automatic large-paste conversion. Read boundaries are not inferred from the driver's single write. Adjacent ESC-free reads can be accumulated, but they still need that same newline-content condition to classify as raw paste.

If it does classify raw paste, the entire candidate, including CR/LF, is emitted as paste (bundled 458–465; report 2612–2619). Terminal converts paste events into `ESC[200~payloadESC[201~` (terminal bundled 740–743; report 3616–3619). Editor paste normalization maps CR/CRLF to LF and inserts, rather than treating those payload bytes as submit (editor bundled 2536–2574; report 9778–9816).

## 2. CR and LF are not interchangeable at the editor

Default bindings: `tui.input.submit = enter`; `tui.input.newLine = shift+enter, ctrl+j` (`packages/tui/src/keybindings.ts`, bundled 70–71; native report 1959–1960).

Crucial editor branch: `packages/tui/src/components/editor.ts`, bundled 1396–1408 (native report 8638–8650): **a single literal LF always enters the earlier newline branch** (`n === "\n" && n.length === 1`), before the submit branch. That branch calls the newline insertion method. This remains true even if native key parsing calls LF `enter`.

There is a narrowly scoped exception: the newline branch can submit for the legacy backslash-enter shortcut only when submission is enabled, the native key matches Enter, the configured submit keys include shift+enter/shift+return, and the previous editor character is backslash (bundled 2626–2637; report 9868–9878). The observed installation prompt ends in a period, not backslash.

A CR recognized as the default Enter goes to submit, subject to the bootstrap gate below. Actual `keys.ts` bundled wrapper delegates matching/parsing to native `matchesKey`/`parseKey` (native report 270–278); that native Rust implementation was not recovered from the 18.14.2 executable. The older checkout's Rust source has both CR and LF as native Enter (`crates/pi-natives/src/keys.rs:722–735,1116–1123`), which is corroboration only, not version-matched proof. The LF **editor override** is directly proven by the actual 18.14.2 bundle.

**Implication for Main's canonical/ICRNL hypothesis:** if the PTY converted the driver's CR to LF before raw mode, the exact editor implementation predicts a draft newline rather than submission. This is a source-supported conditional explanation, **not a proven observation of the failed run's termios or input bytes**.

## 3. There is also a real bootstrap submit gate

`packages/tui/src/prompt/composer.ts`, bundled 123–124 (composer report 123–124): newly created editor has `disableSubmit = true`. The editor remains writable.

`packages/coding-agent/src/modes/interactive-mode.ts`, bundled 1486–1492 (interactive report 3693–3699): the composer can start before bootstrap completes. The same init method later awaits hook/custom-tool initialization and more reconciliation work (report 3762–3777).

At the end of init, bundled 1654–1658 (interactive report 3861–3865), the exact order is:

1. `composer.releaseHeldInput()`;
2. `editor.disableSubmit = false`;
3. update idle readiness and request render.

A received submit key while `disableSubmit` is true is simply returned from: editor bundled 1404–1408 (native report 8646–8650). It does not clear the draft, invoke onSubmit, or schedule that submit for later. Programmatic `submit()` also checks the same gate (report 9517–9520).

Thus a visible rendered composer and complete draft do **not** prove submit-ready. Early CR can independently produce the observed draft if processed while this gate is still closed. Existing output does not separate this from the CR-to-LF hypothesis.

## 4. Exact terminal startup order: first bracketed-paste enable is NOT after the data listener

`packages/tui/src/terminal.ts`, bundled 368–412 (native report 3244–3289): `start()` stores callbacks and either defers input or calls the raw-input setup method; `enableInput()` later calls that method for deferred input.

Raw-input setup, bundled 414–438 (native report 3290–3315), is ordered:

1. Save old raw setting.
2. `process.stdin.setRawMode(true)`.
3. `setEncoding("utf8")`, attach end/close/error listeners, `stdin.resume()`.
4. Emit **`ESC[?2004h`** (bracketed-paste enable).
5. Other terminal setup, then keyboard-query setup.

Keyboard-query setup, bundled 1035–1039 (native report 3911–3915):

1. Construct/configure stdin parser and its data/paste callbacks via `#KA()` (report 3369–3370 and 3615–3628).
2. `process.stdin.on("data", this.#Q)`.
3. Emit **`ESC[?uESC[c`** (keyboard protocol/device-attributes probes).

Therefore:

- Observing the **first** `ESC[?2004h` is evidence that native raw-mode setup returned before that output was enqueued. It is **not** proof that the stdin data listener was already attached: it comes earlier in source order.
- Observing the later `ESC[?uESC[c` is source-order evidence that parser callbacks and the stdin data listener have been installed. It still does **not** prove `disableSubmit` is false.
- These are terminal capability/mode messages, not application submission-ready acknowledgements. No claim that any of them alone solves bootstrap submission is justified.
- The terminal can re-emit `ESC[?2004h` during later writes/input under terminal capability gating, so occurrence alone does not uniquely identify initial startup (native report 3622–3628,4216–4219).

## 5. Supported public paste + submit framing

The native implementation supports this explicit terminal sequence:

`\x1b[200~` + payload + `\x1b[201~` + `\r`

The submit CR is **outside** the bracketed-paste payload. Putting CR inside makes it content/newline.

Evidence:

- Stdin buffer recognizes exact start/end strings (native report 2158–2159), extracts content and remaining bytes, and recognizes a submit immediately after the terminator (bundled 215–219,395–409; report 2369–2373,2549–2563). Supported immediate submit spellings there are CR, LF, and unmodified CSI-u Enter `ESC[13u`/`ESC[13;1u`.
- Terminal preserves the detected trailing submit alongside the rewrapped paste in one callback (report 3616–3619).
- `packages/tui/src/prompt/custom-editor.ts`, bundled 1100–1129 (custom-editor report 1102–1131): it parses the paste, queues remaining input, passes `submitAfterPaste: true` when the remainder matches submission, inserts the paste, and drains the queue.
- Queue replay invokes `handleInput` after paste work (custom-editor report 934–943), eventually reaching the base editor submit gate.

This proves explicit framing support, **not** readiness or successful submission before init. Use CR rather than LF for ordinary base-editor Enter; the retained LF newline branch remains relevant.

Native structured terminal protocol offers a stronger application-level readiness field: custom editor `nativeSendable` is `!nativeKeyPassthrough && onSubmit !== undefined && !disableSubmit && !dictation` (custom-editor report 636–638). Editor native description publishes `sendable: this.nativeSendable` (native report 8377–8380). Native `send` events are accepted only with nonempty text and `nativeSendable` (custom-editor report 814–824). This is a negotiated native-protocol composer field, **not** an ordinary ANSI text marker or a ready token that the current plain-PTY driver already decodes.

`OSC 133;A` is not supported as a bootstrap-ready claim by the inspected code. Its constants occur in `packages/tui/src/chat/user-message.ts` (CLI report 1–6), associated with rendered user-message transcript markers; the interactive frame listener observing it (interactive report 3706–3709) does not lift the submit gate.

## 6. Existing positional CLI prompt: real interactive mode, submitted after init

This is a supported public entry, distinct from `-p`:

`omp [normal options] "the complete prompt"`

Actual 18.14.2 implementation:

- `packages/coding-agent/src/cli/args.ts`, bundled 197–200 (CLI report 522–525): ordinary nonflag args append to `messages`; `--` terminates flag parsing. `-p`/`--print` separately set print mode (report 496–497).
- `main.ts`, bundled 1032–1034 (CLI report 1672–1674): TTY, no print flag, and no explicit mode select interactive mode. Positional messages do not themselves select print mode.
- `cli/initial-message.ts`, bundled 8–13 (report 616–621): with no file/stdin input, it does not consume the first positional message; messages remain in argv message list.
- Interactive branch passes `A.messages` into the interactive runner `wt` (main bundled 1610–1633; report 2250–2273).
- Runner constructs real InteractiveMode and **awaits `v.init(...)`** (main bundled 276–303; report 916–943), so the init submit gate has already been lifted before proceeding.
- After startup setup and initial render, runner loops positional messages and calls real session `await e.prompt(u, { streamingBehavior: "steer" })` (main bundled 382–389; report 1022–1029).
- It then enters the normal interactive `getUserInput()` loop (main bundled 390–393; report 1030–1033). It is not print mode and does not exit automatically after this prompt.

With file/stdin attachments, the separately assembled initialMessage is likewise sent by session.prompt after init (main bundled 374–381; report 1014–1021).

This source path avoids synthesizing the initial keyboard Enter/readiness state. It does **not** exercise the initial PTY text-entry/Enter behavior. Whether this fulfills the owner's existing acceptance contract is a Main/owner decision; no acceptance scope or driver was changed here.

## 7. What retained failure evidence does and does not prove

Read `/tmp/soroi-full-a0-r2-36qhq4ut/evidence/pty/a0.txt`:

- lines 15–17: preparation output, native version 18.14.2, prepared marker;
- lines 19–31: native welcome/composer UI;
- lines 32–38: complete requested prompt visibly remains in composer; literal JSON `\n` is visible inside the code string;
- no assistant/tool turn is visible in this retained output.

This is terminal **output**, not an input-event/termios trace. It cannot prove the exact stdin chunks, whether CR became LF, the relative instant of `disableSubmit=false`, whether native key/submit callbacks ran, or the downstream native proof that was not retained. Source disproves the simplistic “~700 characters automatically becomes paste” theory, but retained evidence alone cannot choose conclusively between pre-raw CR-to-LF and early submit gating. No failed scenario was rerun.

## 8. Context7 lookup (public quota, no credentials)

Read the required research skill and helper implementation. The helper unconditionally tries `.env` if no environment key, so it was **not executed**; used the same public HTTPS API endpoints directly, with no Authorization header/key/store access.

- `pi-tui` lookup found generic upstream Pi, not exact OMP.
- `oh-my-pi` lookup resolved `/can1357/oh-my-pi`; index last updated 2026-10-17, listed versions v18.1.19 and v16.3.9, **not 18.14.2**.
- [Public Context7 paste/readiness query](https://context7.com/api/v2/context?libraryId=%2Fcan1357%2Foh-my-pi&query=pi-tui%20StdinBuffer%20bracketed%20paste%20Enter%20submit%20disableSubmit%20startup%20readiness%20OSC%20133&type=json) returned the Editor disableSubmit API and the documentation statement that interactive bootstrap stays writable with `sendable:false`, then publishes `sendable:true` only when handlers/subscriptions are ready. Source: [tui-core-renderer.md](https://github.com/can1357/oh-my-pi/blob/main/docs/tui-core-renderer.md), [tui README](https://github.com/can1357/oh-my-pi/blob/main/packages/tui/README.md). This corroborates the exact bundled implementation but is not version authority.
- [Public Context7 CLI query](https://context7.com/api/v2/context?libraryId=%2Fcan1357%2Foh-my-pi&query=interactive%20mode%20positional%20initial%20prompt%20omp%20%22prompt%22%20--print%20CLI&type=json) returned the explicit documented example `omp "List all .ts files in src/"` labeled **Interactive session with an initial prompt**, contrasted with `omp -p ...` noninteractive. Source: [cli-reference.md](https://github.com/can1357/oh-my-pi/blob/main/docs/cli-reference.md).
