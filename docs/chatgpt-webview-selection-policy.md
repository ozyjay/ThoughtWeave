ThoughtWeave Policy: ChatGPT Webview, User Selection, and Adaptive UX

Status: Draft
Project: ThoughtWeave
Last reviewed: 2026-06-13
Purpose: Internal development policy for a local adaptive UX prototype that may display ChatGPT in a webview and adapt the surrounding interface based on user-selected excerpts.

1. Policy intent

ThoughtWeave is intended to be a personal adaptive reading, annotation, and interaction shell for long-form AI conversations.

The project must not be designed as a scraper, automation tool, ChatGPT clone, credential broker, account-sharing system, or redistribution layer for OpenAI services.

Where ThoughtWeave integrates with ChatGPT through a webview, the design principle is:

The user remains in control. ThoughtWeave may only process text that the user explicitly selects and sends to ThoughtWeave.

2. Core compliance principles

ThoughtWeave must follow these principles:

1. Do not share or proxy a user’s ChatGPT account.
2. Do not store, request, intercept, or manage ChatGPT credentials.
3. Do not automatically or continuously extract ChatGPT conversation content.
4. Do not scrape, crawl, monitor, or parse the ChatGPT DOM to reconstruct conversations.
5. Do not bypass ChatGPT restrictions, rate limits, login flows, safety mitigations, or interface controls.
6. Do not represent OpenAI output as human-generated.
7. Do not modify, copy, sell, lease, distribute, or repackage OpenAI services.
8. Do not use ChatGPT output to train or develop models that compete with OpenAI.
9. Prefer official APIs or supported integration paths for production features.
10. Treat this policy as a minimum design constraint, not a legal opinion.

3. Allowed prototype pattern

The following pattern is allowed for the ThoughtWeave prototype:

1. The user opens ChatGPT in a webview.
2. The user logs in directly through ChatGPT.
3. ThoughtWeave does not access or store credentials.
4. The user reads ChatGPT normally.
5. The user manually selects a section of text.
6. The user explicitly activates a ThoughtWeave action such as:
    * “Use selection”
    * “Adapt UX from selection”
    * “Create note from selection”
    * “Build reading lens from selection”
7. ThoughtWeave receives only the selected excerpt.
8. ThoughtWeave adapts its own local interface around that excerpt.

This is the preferred framing:

ThoughtWeave only receives user-selected excerpts that the user explicitly sends to ThoughtWeave.

Avoid this framing:

ThoughtWeave grabs text from ChatGPT.

4. Disallowed webview behaviours

ThoughtWeave must not:

* Scan the ChatGPT page in the background.
* Read the full DOM of ChatGPT conversations.
* Automatically detect all messages, headings, paragraphs, code blocks, or tables in ChatGPT.
* Save full ChatGPT conversations from the webview.
* Reconstruct a conversation transcript by reading the page.
* Auto-sync ChatGPT content into ThoughtWeave.
* Use hidden scripts to monitor user activity inside ChatGPT.
* Inject scripts that alter ChatGPT behaviour.
* Send automated prompts through the ChatGPT website.
* Attempt to bypass usage limits, rate limits, paywalls, safety systems, or access restrictions.
* Allow multiple people to use one person’s ChatGPT account through ThoughtWeave.

5. Manual selection rule

ThoughtWeave may process selected text only when all of the following are true:

* The user intentionally selected the text.
* The user intentionally triggered the ThoughtWeave action.
* The selected text is limited to the user’s current selection.
* The action is visible and understandable to the user.
* The excerpt is used only for the selected local UX purpose.
* ThoughtWeave does not continue reading the page after the action completes.

Recommended UI wording:

Use selected text in ThoughtWeave

Recommended confirmation for first use:

ThoughtWeave will receive only the text you selected. It will not scan or save the rest of the ChatGPT page.

6. Data handling policy

By default, ThoughtWeave should store as little as possible.

Allowed local data:

* User-created notes.
* User-created labels.
* User-selected excerpts.
* Local reading state.
* Local layout preferences.
* Local UX mode preferences.
* Links or timestamps created by the user for navigation.

Avoid storing:

* Full ChatGPT conversations copied from the webview.
* ChatGPT session cookies.
* Authentication tokens.
* Login details.
* Hidden page metadata.
* Automatically extracted message structure.
* Background logs of user reading behaviour.

If excerpts are stored, the user must be able to:

* See what has been stored.
* Delete stored excerpts.
* Disable excerpt persistence.
* Use ThoughtWeave without cloud sync.
* Export their own ThoughtWeave notes and metadata.

7. UX adaptation boundaries

ThoughtWeave may adapt its own interface based on user-selected text.

Examples of acceptable UX adaptation:

* Create a side note.
* Open a focused reading pane.
* Suggest a “research lens.”
* Create a local bookmark.
* Create a local topic card.
* Offer a manual follow-up prompt draft.
* Reorganise ThoughtWeave’s own panels.
* Highlight related local notes.
* Change the local workspace mode.

Examples that should be avoided:

* Automatically remapping the entire ChatGPT conversation.
* Continuously classifying every ChatGPT response.
* Creating a full conversation graph from page content.
* Automatically extracting code blocks, citations, or tables from ChatGPT.
* Replacing ChatGPT’s interface with a re-rendered copy.
* Making ChatGPT appear to be part of ThoughtWeave’s own service.

8. Webview implementation rules

The webview must be treated as a browser surface controlled by the user.

Implementation rules:

* Do not intercept credentials.
* Do not persist authentication material outside the webview/browser profile.
* Do not inject background monitoring scripts.
* Do not run continuous observers over the ChatGPT DOM.
* Do not modify ChatGPT network requests.
* Do not intercept ChatGPT API calls made by the website.
* Do not hide OpenAI branding or interface context.
* Do not imply ThoughtWeave is endorsed by OpenAI unless that is formally true.
* Clearly distinguish ThoughtWeave UI from ChatGPT UI.

If JavaScript is used to retrieve the current text selection, it must be:

* User-triggered.
* Limited to the current selection.
* Non-continuous.
* Transparent in the UI.
* Disabled by default if a safer copy/paste path is available.

9. Safer copy/paste fallback

ThoughtWeave should support a low-risk fallback mode:

1. User manually copies text from ChatGPT.
2. User pastes it into ThoughtWeave.
3. ThoughtWeave adapts the local UX from that pasted excerpt.

This mode should remain available even if direct selection handoff is implemented.

10. Production architecture preference

The webview approach is acceptable only as a constrained local prototype.

For production, ThoughtWeave should prefer:

* The OpenAI API.
* A backend-mediated architecture.
* Official OpenAI developer documentation.
* Official app, connector, action, or integration mechanisms where appropriate.

Production builds should not depend on scraping or extracting content from the ChatGPT website.

11. API key handling

If ThoughtWeave uses the OpenAI API:

* Do not place API keys in client-side code.
* Do not commit API keys to the repository.
* Use environment variables for local development.
* Use a backend service for production API calls.
* Use separate keys for separate users or team members.
* Rotate keys if exposure is suspected.
* Monitor usage for unexpected activity.

Recommended environment variable name:

OPENAI_API_KEY

Never include real keys in:

* Git commits.
* Screenshots.
* Logs.
* Issue reports.
* Test fixtures.
* Example config files.
* VS Code settings committed to the repo.

12. User communication

ThoughtWeave should explain its behaviour plainly.

Suggested first-run notice:

ThoughtWeave can adapt its local interface from text you explicitly select and send to it. It does not scan your ChatGPT conversation, store your login details, or share your ChatGPT account.

Suggested selection action notice:

Only your selected text will be sent to ThoughtWeave for this action.

Suggested persistence notice:

Saved excerpts are stored locally unless you enable another storage option.

13. Development checklist

Before merging a feature, check:

* Does this feature read ChatGPT content without explicit user selection?
* Does this feature monitor the ChatGPT page continuously?
* Does this feature store more text than the user selected?
* Does this feature access credentials, cookies, tokens, or hidden page data?
* Does this feature automate ChatGPT through the website?
* Does this feature obscure the difference between ChatGPT and ThoughtWeave?
* Does this feature make one user’s ChatGPT account available to someone else?
* Could this feature reasonably be described as scraping?
* Could this feature be implemented through copy/paste instead?
* Should this feature use the OpenAI API instead of the ChatGPT website?

If the answer to any risk question is yes, redesign before merging.

14. Risk categories

Low risk

* Manual copy/paste into ThoughtWeave.
* User-selected excerpt sent through an explicit action.
* Local notes and bookmarks.
* Local UX adaptation based on selected excerpts.
* No background page reading.

Medium risk

* User-triggered JavaScript selection retrieval from the webview.
* Local persistence of selected excerpts.
* Automatic classification of selected excerpts.
* LLM-based adaptation of ThoughtWeave UI based on selected excerpts.

Medium-risk features require clear UI disclosure and minimal data handling.

High risk

* Background DOM scanning.
* Full conversation extraction.
* Automatic transcript creation.
* Prompt automation through the ChatGPT website.
* Network interception.
* Hidden monitoring scripts.
* Re-rendering ChatGPT content as a ThoughtWeave interface.
* Account sharing or credential proxying.

High-risk features are not allowed in this project.

15. Non-goals

ThoughtWeave is not:

* A ChatGPT scraper.
* A ChatGPT automation bot.
* A replacement ChatGPT client.
* A way to avoid OpenAI usage limits.
* A way to share one ChatGPT account.
* A system for harvesting AI outputs.
* A model-training data collection tool.
* An OpenAI-affiliated product unless formally approved.

16. Review process

This policy should be reviewed when:

* OpenAI changes relevant terms or policies.
* ThoughtWeave moves from local prototype to public release.
* ThoughtWeave adds API-based features.
* ThoughtWeave adds sync or cloud storage.
* ThoughtWeave changes how it accesses selected text.
* ThoughtWeave becomes available to users other than the original developer.

Any feature that touches ChatGPT page content, user credentials, API keys, cloud storage, or automated extraction requires explicit design review before implementation.

17. Source basis

This policy is informed by:

* OpenAI Terms of Use.
* OpenAI Service Terms.
* OpenAI API key safety guidance.
* OpenAI Data Controls FAQ.
* The project goal of keeping ThoughtWeave as a local, user-directed adaptive UX prototype.

This document is a development policy and risk-reduction guide. It is not legal advice.