# Workflow for Agent: Setting Up React CI/CD on Hostinger

This document provides instructions for an AI agent to create or modify a GitHub Actions workflow for a React project (SPA) to be deployed to Hostinger with a manual approval gate.

## Objective
Create a `.github/workflows/deploy.yml` file that:
1. Builds the React application on every `push` and `pull_request`.
2. Deploys to a Hostinger server via `rsync` **only** after a Pull Request is merged into `master` or via a manual trigger.
3. Uses a single unified job (`build-and-deploy`) to run build, tests, and deploy without generating intermediate GitHub artifacts.
4. **Implements an automatic retry mechanism** to handle transient network failures with the server.

## Git Flow Strategy
This project follows a Git Flow-inspired branching model:
- **`dev` Branch**: The main integration branch. All development branches must be created from `dev`.
- **`feature/*`, `bugfix/*`, `refactor/*` Branches**: Temporary branches for specific tasks. They must always target `dev` in Pull Requests.
- **`master` Branch**: The stable production branch. The `dev` branch is merged into `master` only when a new release is ready for production.

**Deployment Rule**: The production deployment is **only** triggered when code is merged into the `master` branch. Merges into `dev` will trigger a build for validation but will not result in a production upload.

## 1. Triggers
The workflow should listen to:
- `push` on the `master` and `dev` branches.
- `pull_request` targeting the `master` and `dev` branches.
- `workflow_dispatch` (manual button).

## 2. GitHub Secrets
The agent must inform the user that the following secrets are required in the repository settings:
- `HOSTINGER_USER`: The Hostinger SSH username (e.g., `u123456789`).
- `HOSTINGER_DOMAIN`: The target domain name (e.g., `exemplo.com`).
- `HOSTINGER_IP`: The IP address of the server (numeric IP is recommended for speed/stability).
- `HUGONORTE_PRIVATE_SSH_KEY`: The private SSH key for authentication.
- `HOSTINGER_PORT` (optional, default 65002): The SSH port.

## 3. Workflow Structure

### Job: Build and Deploy (Single Unified Job)
- **Environment**: `ubuntu-latest`.
- **Rationale**: A single unified job runs faster and uses zero artifact storage.
- **Steps**:
    - **Checkout code**: Using `actions/checkout@v4`.
    - **Setup Node.js**: Version 22+ using `actions/setup-node@v4` (caching: `npm`).
    - **Install dependencies**: `npm install`.
    - **Generate static SPA**: `npm run build` (produces `dist/`).
    - **Deploy with Retry**: Wrap the rsync shell command with `nick-fields/retry@v3`.
        - **Conditional**: Run the deploy step only if `github.event_name != 'pull_request' && (github.ref == 'refs/heads/master' || github.event_name == 'workflow_dispatch')`.
        - **Attempts**: 3
        - **Delay**: 120s (2 minutes)
        - **Command**:
            ```bash
            eval $(ssh-agent -s)
            echo "${{ secrets.HUGONORTE_PRIVATE_SSH_KEY }}" | tr -d '\r' | ssh-add -
            rsync -avzr --delete -e "ssh -p 65002 -o StrictHostKeyChecking=no" dist/ ${{ secrets.HOSTINGER_USER }}@${{ secrets.HOSTINGER_IP }}:/home/${{ secrets.HOSTINGER_USER }}/domains/${{ secrets.HOSTINGER_DOMAIN }}/public_html/
            ```

## 4. Critical Implementation Detail
> [!IMPORTANT]
> **Why use a direct shell command for deployment instead of an Action wrapper?**
> When dealing with multiline secrets like Private SSH Keys, nesting them inside a YAML-based retry wrapper (like `Wandalen/wretry.action`) often causes **YAML parsing errors** (`block mapping entry error`).
> 
> **Solution**: Using `nick-fields/retry` with a direct `command` block is the most robust method. It treats the secret as a simple string expansion inside a bash script, avoiding all YAML indentation issues.

## 5. React Configuration Hints
- Ensure `vite.config.ts` does not have a hardcoded `base` URL if deploying to a subdirectory, or adjust accordingly.
- The project is an SPA, so an `.htaccess` file is needed in `public/` to handle client-side routing on Hostinger (Apache/LiteSpeed).
