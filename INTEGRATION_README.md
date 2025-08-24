# SafeMama Chain – Blockchain Integration

This repository was upgraded with a full **Hardhat** smart-contract workspace and a **real wallet connection** in the frontend.

## What was added
- `blockchain/` – Hardhat project
  - Contracts: `PeriodAidDonations.sol` (escrowed donations for menstrual health), `SafeReportRegistry.sol` (immutable report registry), `mocks/MockERC20.sol` for tests
  - Scripts: `scripts/deploy.ts`
  - Tests: `test/PeriodAidDonations.test.ts`
  - `hardhat.config.ts`, `.env.example`, `package.json`
- Frontend
  - `src/hooks/useWallet.tsx` – real MetaMask connection (ethers v6)
  - `src/hooks/useContracts.ts` – provider + contract instances
  - `src/abi/*.json` – ABIs for the two contracts
  - `src/config/contracts.json` – addresses placeholder (fill after deploy)
  - `src/components/PeriodAid.tsx` – wire up `createRequest` and `donate`
  - **NEW: Network Switcher** – Seamlessly switch between Ethereum Sepolia and Polygon Mumbai networks
  - **NEW: CSV Export** – Export all events to CSV format for offline analysis

## Supported Networks
- **Ethereum Sepolia** (Testnet)
  - Chain ID: 0xaa36a7
  - RPC: https://rpc.sepolia.org
  - Explorer: https://sepolia.etherscan.io
- **Polygon Mumbai** (Testnet)
  - Chain ID: 0x13881
  - RPC: https://rpc-mumbai.maticvigil.com
  - Explorer: https://mumbai.polygonscan.com

## Install & Run

### 1) Contracts
```bash
cd blockchain
npm install
cp .env.example .env
# fill RPC + PRIVATE_KEY
npm run build
npm run deploy:sepolia   # or :mumbai
```
Copy the printed addresses and paste them into `src/config/contracts.json`:

```json
{
  "defaultNetwork": "sepolia",
  "contracts": {
    "SafeReportRegistry": { "sepolia": "<DEPLOYED_ADDR>", "mumbai": "<DEPLOYED_ADDR>" },
    "PeriodAidDonations": { "sepolia": "<DEPLOYED_ADDR>", "mumbai": "<DEPLOYED_ADDR>" },
    "USDC": { "sepolia": "<USDC_TOKEN_ADDR>", "mumbai": "<USDC_TOKEN_ADDR>" }
  }
}
```

### 2) Frontend
At repository root:
```bash
npm install
npm run dev
```

### Network Switching
The application now includes a **NetworkSwitcher** component in the header that allows users to seamlessly switch between supported networks:

- **Automatic Network Detection**: Detects current network and provides appropriate options
- **MetaMask Integration**: Uses `wallet_switchEthereumChain` and `wallet_addEthereumChain` for smooth switching
- **Loading States**: Shows loading indicators during network transitions
- **Error Handling**: Gracefully handles network addition and switching errors

### CSV Export Feature
The **PeriodAidDashboard** now includes a CSV export functionality:

- **Location**: `/periodaid/dashboard`
- **Usage**: Click "Export CSV" button to download all events
- **Format**: Includes event type, request ID, donor address, amount, and timestamp
- **Purpose**: Offline analysis, reporting, and audit trails

### Using the app
- Go to **/periodaid** route
- Connect wallet
- Use the network switcher in the header to switch between Sepolia and Mumbai
- Submit a request (needs a `stableAddress` USDC/DAI, use a test token)
- Verify via NGO account (call `verifyRequest` from a script or add an admin button)
- Donate and release funds
- Export events to CSV for analysis

## Notes
- No PII is stored on-chain. Use IPFS CIDs for encrypted payloads.
- Approvals: Before `donate`, the donor must call `approve(USDC, PeriodAidDonationsAddress, amount)`.
- Roles: The deployer has `DEFAULT_ADMIN_ROLE`, `VERIFIER_ROLE`, and `TREASURY_ROLE` by default.

## New Admin & Dashboard
- **/periodaid/admin** – Verifier/Treasury controls (verify, approve for release, release, cancel) + role detection using `hasRole`.
- **/periodaid/dashboard** – Live event stream + on-chain request list (auto-refresh on new events) + CSV export functionality.

## Encrypted IPFS Uploader
- **/tools/ipfs** – Encrypt JSON in-browser (AES-GCM) and upload to IPFS via web3.storage. Only the CID goes on-chain; keep the key+iv safe.

## Tools
- **/tools/ipfs** – Encrypt and upload JSON to IPFS (web3.storage).
- **/tools/ipfs-decrypt** – Fetch ciphertext by CID and decrypt locally (AES-GCM).

## Role Management
Use `blockchain/scripts/grantRoles.ts` to grant `VERIFIER_ROLE` and `TREASURY_ROLE`.

## Network Configuration
To add support for additional networks, update the `networks` configuration in `src/components/NetworkSwitcher.tsx`:

```typescript
const networks: Record<string, any> = {
  sepolia: { /* existing config */ },
  mumbai: { /* existing config */ },
  // Add new networks here
  yourNetwork: {
    chainId: "0x...",
    chainName: "Your Network",
    rpcUrls: ["https://..."],
    nativeCurrency: { name: "Token", symbol: "TKN", decimals: 18 },
    blockExplorerUrls: ["https://..."]
  }
};
```