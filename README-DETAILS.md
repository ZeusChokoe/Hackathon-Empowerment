# SafeMama Chain – Detailed Implementation Notes

This document explains the architecture and the exact additions made: contracts, scripts, frontend hooks, UI, and the encrypted IPFS workflow.

## Contracts Overview

### PeriodAidDonations
- Escrow for stablecoins (e.g., USDC) per **requestId**.
- Roles:
  - `VERIFIER_ROLE`: confirms legitimate requests and approves for release.
  - `TREASURY_ROLE`: executes fund release to beneficiary.
- States: Pending → Fundraising → Funded → Released / Cancelled / Refunding.
- Key functions:
  - `createRequest(stable, targetAmount, category, cid)`
  - `donate(requestId, amount)` (requires ERC20 approval from donor)
  - `verifyRequest(requestId)` (VERIFIER_ROLE)
  - `approveForRelease(requestId, beneficiary)` (VERIFIER_ROLE)
  - `release(requestId)` (TREASURY_ROLE)
  - `cancel(requestId)` (admin flow) – triggers refund path
- Events: `RequestCreated`, `Donated`, `Verified`, `ApprovedForRelease`, `Released`, `Cancelled`

### SafeReportRegistry
- On-chain registry for report CIDs.
- Use when you need an auditable reference to encrypted/off-chain evidence.

## Hardhat Scripts
- `scripts/deploy.ts` – deploys all contracts.
- `scripts/approveAndDonate.ts` – helper to approve USDC and donate.
- `scripts/grantRoles.ts` – assign `VERIFIER_ROLE` and `TREASURY_ROLE` to EOAs.

## Frontend

### Wallet / Contracts
- `useWallet.tsx` – connect wallet, track address & network.
- `useContracts.ts` – ethers v6 providers + typed contract instances via ABIs and `src/config/contracts.json`.

### Admin & Dashboard
- **`/periodaid/admin`** (`PeriodAidAdmin.tsx`):
  - Shows your current roles (via `hasRole` calls).
  - Buttons to verify, approve for release, release, cancel.
- **`/periodaid/dashboard`** (`PeriodAidDashboard.tsx`):
  - Live event feed using `usePeriodAidEvents`.
  - Chain-backed request list that auto-refreshes on new events.
  - **NEW: CSV Export** - Export all events to CSV format for offline analysis and reporting.

### Event Hook
- `usePeriodAidEvents.ts` – subscribes to provider logs for `PeriodAidDonations` and decodes with the ABI.

### Donation UI
- `PeriodAid.tsx` – includes **Approve USDC** helper and donation flow.
- **ERC20 ABI** available in `src/abi/ERC20.json` for allowance/approve/balance.

### Network Switching
- **NEW: NetworkSwitcher component** - Seamlessly switch between Ethereum Sepolia and Polygon Mumbai networks.
- Located in the header for easy access across all pages.
- Automatically handles network addition if not already configured in MetaMask.

## Encrypted IPFS Workflow

### Encrypt & Upload (`/tools/ipfs`)
- `IpfsEncryptor.tsx`:
  - Encrypts JSON via **AES-GCM** (WebCrypto).
  - Uploads ciphertext blob to **web3.storage** with a user-provided token.
  - Returns `CID`, plus the randomly generated `key` and `iv` (hex).
- **Security note**: Store `key` and `iv` safely (never on-chain). Only the `CID` is recorded on-chain.

### Fetch & Decrypt (`/tools/ipfs-decrypt`)
- `IpfsDecryptor.tsx`:
  - Fetches ciphertext from the public gateway `w3s.link` (changeable).
  - Decrypts in the browser using the provided `key` and `iv`.
  - Displays plaintext for review by authorized users (e.g., verifiers).

## Configuration

Edit `src/config/contracts.json`:
```json
{
  "defaultNetwork": "sepolia",
  "contracts": {
    "SafeReportRegistry": { "sepolia": "0x..." },
    "PeriodAidDonations": { "sepolia": "0x..." },
    "USDC": { "sepolia": "0x..." }
  }
}
```

## Supported Networks
- **Ethereum Sepolia** (Testnet)
  - Chain ID: 0xaa36a7
  - RPC: https://rpc.sepolia.org
  - Explorer: https://sepolia.etherscan.io
- **Polygon Mumbai** (Testnet)
  - Chain ID: 0x13881
  - RPC: https://rpc-mumbai.maticvigil.com
  - Explorer: https://mumbai.polygonscan.com

## Typical Flows

### A) Create + Fund + Release
1. Beneficiary creates a request (with CID to encrypted proof).
2. Donors approve USDC then donate.
3. Verifier checks off-chain evidence (decrypts IPFS if needed) and runs `verifyRequest` then `approveForRelease`.
4. Treasury releases to beneficiary.

### B) Cancel + Refund
- If a request is invalid or blocked, admin cancels. Donors can withdraw refunds (functionality in contract).

## CSV Export Feature
- **Location**: PeriodAidDashboard.tsx
- **Usage**: Click "Export CSV" button to download all events as a CSV file
- **Format**: Includes event type, request ID, donor address, amount, and timestamp
- **Purpose**: Offline analysis, reporting, and audit trails

## Network Switching
- **Component**: NetworkSwitcher.tsx
- **Usage**: Click network buttons in the header to switch between Sepolia and Mumbai
- **Features**:
  - Automatic network addition if not configured
  - Loading states during network switching
  - Responsive design for mobile and desktop

## Testing & Scripts
- Deploy: `npm run deploy:sepolia` in `blockchain/`.
- Approve+Donate: `npx hardhat run scripts/approveAndDonate.ts --network sepolia` (set env vars).
- Grant roles: `npx hardhat run scripts/grantRoles.ts --network sepolia` with `PERIOD_AID`, `VERIFIER`, `TREASURY`.

## Notes
- Ethers v6 is used consistently.
- TypeScript edges use `any` only where required to avoid type regressions.
- All new pages and components are isolated to avoid affecting existing routes.
- CSV export and network switching features are fully integrated with shadcn/ui components for consistent styling.