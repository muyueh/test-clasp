# Repository Visual Overview

## Git History
```mermaid
gitGraph
    commit id: "Initial commit" tag: "76f4655"
    branch codex/insert-and-update-mermaid-diagrams-in-readme
    checkout codex/insert-and-update-mermaid-diagrams-in-readme
    commit id: "Add README diagrams" tag: "e9d2b72"
    checkout work
    merge codex/insert-and-update-mermaid-diagrams-in-readme tag: "9762afb"
    branch codex/create-github-actions-workflow-for-gas-deployment
    checkout codex/create-github-actions-workflow-for-gas-deployment
    commit id: "Automate GAS deploys" tag: "ad22ec6"
    checkout work
    merge codex/create-github-actions-workflow-for-gas-deployment tag: "edc5690"
    branch codex/create-.clasp.json-file-with-scriptid-and-rootdir
    checkout codex/create-.clasp.json-file-with-scriptid-and-rootdir
    commit id: "Track GAS binding" tag: "c7d1438"
    checkout work
    merge codex/create-.clasp.json-file-with-scriptid-and-rootdir tag: "f6d7e5e"
    commit id: "Align deploy trigger with work" tag: "HEAD"
```

## Repository State Progression
```mermaid
stateDiagram-v2
    [*] --> Initialized: Repo scaffolded on `work`
    Initialized --> Diagrammed: Mermaid diagrams curated
    Diagrammed --> AutomatedDeployments: GAS workflow + clasp usage defined
    AutomatedDeployments --> BoundToGASProject: `.clasp.json` captured scriptId + rootDir
    BoundToGASProject --> ReadyForGASPush: CI + dev tooling share the same clasp config
    ReadyForGASPush --> Updated: `clasp push -f` publishes latest script
    Updated --> Diagrammed: README diagrams refreshed alongside commits
```

## Contribution Sequence
```mermaid
sequenceDiagram
    participant Dev as Contributor
    participant Repo as Repo (work)
    participant CI as GitHub Actions
    participant GAS as Google Apps Script
    Dev->>Repo: Commit workflow, .clasp binding, and diagram updates
    Repo-->>CI: Push to work triggers deploy-gas.yml
    CI->>CI: Restore ~/.clasprc.json from CLASPRC_JSON secret
    CI->>CI: npm install -g @google/clasp
    CI->>Repo: Read `.clasp.json` for scriptId/rootDir
    CI->>GAS: Run `clasp push -f` from configured rootDir
    alt Deployment ID provided
        CI->>GAS: Run `clasp deploy`
    end
    GAS-->>Dev: Latest script version is live
```

## Current Architecture Overview
```mermaid
flowchart TD
    subgraph Repo
        README[README.md with synced diagrams]
        Workflow[.github/workflows/deploy-gas.yml]
        ClaspConfig[.clasp.json binding]
        Source[src/ Apps Script sources]
    end
    Secrets[GitHub Secrets\nCLASPRC_JSON + optional CLASP_DEPLOYMENT_ID]
    Runner[GitHub Actions Runner]
    GAS[Google Apps Script Project]
    Contributors[Contributors & Reviewers]
    README --> Contributors
    Workflow --> Runner
    Source --> ClaspConfig
    ClaspConfig --> Runner
    Source --> Contributors
    Secrets --> Runner
    Runner --> GAS
    GAS --> Contributors
```

## Swimlane Responsibilities
```mermaid
flowchart LR
    subgraph User
        U1[Plan updates and track git branches]
        U2[Commit README + workflow changes]
        U3[Record `.clasp.json` scriptId/rootDir]
        U4[Push to work to trigger deploy]
    end
    subgraph Frontend
        F1[Render Mermaid diagrams for visibility]
    end
    subgraph Backend
        B1[GitHub Actions executes deploy-gas.yml]
        B2[@google/clasp reads `.clasp.json` and deploys GAS project]
    end
    U1 --> U2 --> U3 --> U4 --> B1 --> B2
    U2 --> F1
    B2 --> U1
```

## Maintenance Notes
- Always keep the diagrams above synchronized with the actual repository structure, git history, and workflows whenever changes are made.
- Update this README alongside any code or documentation changes to ensure future contributors can rely on the visual overview.
- Verify `.github/workflows/deploy-gas.yml` continues to restore `~/.clasprc.json`, install `@google/clasp`, and run `clasp push -f` (plus optional `clasp deploy`) whenever the deployment process evolves.
- Keep `.clasp.json` synchronized with the Apps Script project (`AKfycbxzV1ZsEhazhBugZuDUFcPRl1BDpRP70dNDO7xHe7pUm1c1XQ`) and the chosen `rootDir` (`src`).
