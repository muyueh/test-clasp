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
    commit id: "Automate GAS deploys" tag: "HEAD"
```

## Repository State Progression
```mermaid
stateDiagram-v2
    [*] --> Initialized: Repo scaffolded on `work`
    Initialized --> Diagrammed: Mermaid diagrams curated
    Diagrammed --> AutomatedDeployments: GAS workflow + clasp usage defined
    AutomatedDeployments --> ReadyForGASPush: Secrets restored to ~/.clasprc.json
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
    Dev->>Repo: Commit workflow + diagram updates
    Repo-->>CI: Push to main triggers deploy-gas.yml
    CI->>CI: Restore ~/.clasprc.json from CLASPRC_JSON secret
    CI->>CI: npm install -g @google/clasp
    CI->>GAS: Run `clasp push -f`
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
    end
    Secrets[GitHub Secrets\nCLASPRC_JSON + optional CLASP_DEPLOYMENT_ID]
    Runner[GitHub Actions Runner]
    GAS[Google Apps Script Project]
    Contributors[Contributors & Reviewers]
    README --> Contributors
    Workflow --> Runner
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
        U3[Push to main to trigger deploy]
    end
    subgraph Frontend
        F1[Render Mermaid diagrams for visibility]
    end
    subgraph Backend
        B1[GitHub Actions executes deploy-gas.yml]
        B2[@google/clasp pushes and deploys GAS project]
    end
    U1 --> U2 --> U3 --> B1 --> B2
    U2 --> F1
    B2 --> U1
```

## Maintenance Notes
- Always keep the diagrams above synchronized with the actual repository structure, git history, and workflows whenever changes are made.
- Update this README alongside any code or documentation changes to ensure future contributors can rely on the visual overview.
- Verify `.github/workflows/deploy-gas.yml` continues to restore `~/.clasprc.json`, install `@google/clasp`, and run `clasp push -f` (plus optional `clasp deploy`) whenever the deployment process evolves.
