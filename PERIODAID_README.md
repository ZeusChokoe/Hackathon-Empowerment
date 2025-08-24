# PeriodAid - Blockchain Donations for Menstrual Health

## 🌟 Overview

PeriodAid is a blockchain-powered web application that fights Period Poverty by enabling transparent donations for menstrual health support. The platform allows women to request help anonymously, verified NGOs to review requests, and donors to contribute with full transparency and impact tracking.

## 🏗️ Technical Architecture

### Frontend Stack
- **React + TypeScript** - Main application framework
- **Tailwind CSS** - Styling and design system
- **Vite** - Build tool and development server
- **React Router** - Client-side routing
- **Wagmi/Viem** - Ethereum/Polygon blockchain integration (to be implemented)
- **TanStack Query** - Data fetching and caching

### Blockchain Stack (To Be Implemented)
- **Solidity Smart Contracts** - Escrow, donations, verification
- **Polygon Network** - Layer 2 for low gas fees
- **USDC/DAI** - Stablecoin donations
- **IPFS** - Decentralized storage for encrypted data
- **MetaMask/WalletConnect** - Wallet integration

## 📁 File Structure & Functions

### Core Application Files

#### `src/App.tsx`
**Purpose**: Main application router and providers setup
**Functions**:
- `App()` - Root component with routing configuration
- Sets up QueryClient, TooltipProvider, and BrowserRouter
- Defines routes for /, /periodaid, /safereport, /track

#### `src/pages/Index.tsx`
**Purpose**: Main landing page with all platform sections
**Functions**:
- `Index()` - Main page component
- Renders Header, Hero, LoanApplication, Education, HealthcareSupport, DonorPortal, Footer

#### `src/components/PeriodAid.tsx`
**Purpose**: Main PeriodAid donation platform interface
**Functions**:
- `PeriodAid()` - Main component with tabbed interface
- `handleDonate(requestId, amount)` - Processes individual donations
- `handleRecurringSetup()` - Sets up recurring donation subscriptions
- **State Management**:
  - `selectedTab` - Controls which tab is active
  - `selectedRequest` - Currently selected aid request
  - `donationAmount` - Amount for one-time donations
  - `recurringAmount` - Amount for recurring donations
  - `recurringFrequency` - Monthly/weekly frequency

**Key Features**:
- Browse aid requests with progress tracking
- One-time and recurring donation setup
- Request submission form
- Educational resources
- Impact dashboard with statistics

#### `src/components/Header.tsx`
**Purpose**: Navigation header with wallet integration
**Functions**:
- `Header()` - Main header component
- Wallet connection status display
- Navigation links (replaced Dashboard with PeriodAid)
- Mobile responsive menu

### Wallet Integration

#### `src/hooks/useWallet.tsx`
**Purpose**: Ethereum wallet connection and balance management
**Functions**:
- `connectWallet()` - Connects to MetaMask/Web3 wallet
- `disconnectWallet()` - Disconnects wallet
- `fetchBalances()` - Gets ETH, USDC, token balances
- `updateBalances()` - Periodic balance updates
- `estimateGas()` - Gas fee estimation
- `formatAddress()` - Formats wallet address for display
- `convertUSDToZAR()` - Currency conversion
- `convertETHToZAR()` - ETH to ZAR conversion

**State Properties**:
- `address` - Connected wallet address
- `isConnected` - Connection status
- `isConnecting` - Loading state
- `ethBalance` - ETH balance
- `tokenBalance` - Token balance
- `usdcBalance` - USDC balance
- `gasPrice` - Current gas price

### Form Validation

#### `src/hooks/useFormValidation.tsx`
**Purpose**: Form validation and state management
**Functions**:
- `validateField(name, value)` - Validates individual field
- `validateAll()` - Validates entire form
- `handleChange(name, value)` - Updates form data with validation
- `handleBlur(name)` - Marks field as touched
- `handleSubmit(onSubmit)` - Handles form submission
- `reset()` - Resets form to initial state

**Validation Rules**:
- `required` - Field is required
- `minLength` - Minimum character length
- `maxLength` - Maximum character length
- `pattern` - Regex pattern matching
- `custom` - Custom validation function

### Data Management

#### `src/hooks/useLiveData.tsx`
**Purpose**: Real-time data simulation and management
**Functions**:
- `useLiveData()` - Provides live updating data
- Simulates real-time updates for education programs
- Provides progress tracking data

### Other Components

#### `src/components/LoanApplication.tsx`
**Purpose**: Loan application form with wallet integration
**Functions**:
- Form validation using useFormValidation hook
- Wallet balance checking before submission
- Integration with MetaMask for transactions

#### `src/components/Education.tsx`
**Purpose**: Educational resources and programs
**Functions**:
- Educational content display
- Healthcare program enrollment
- Progress tracking integration

#### `src/components/DonorPortal.tsx`
**Purpose**: Donation campaigns and donor management
**Functions**:
- Campaign browsing and donation
- Wallet integration for donations
- Campaign details modal

## 🔗 Solidity Integration Requirements

### Smart Contracts Needed

#### 1. PeriodAidEscrow.sol
```solidity
// Main escrow contract for donations
contract PeriodAidEscrow {
    // Functions needed:
    function createRequest(string memory ipfsHash, uint256 goalAmount) external;
    function verifyRequest(uint256 requestId) external onlyNGO;
    function donate(uint256 requestId) external payable;
    function releaseToNGO(uint256 requestId) external;
    function refund(uint256 requestId) external;
    function setupRecurring(uint256 amount, uint256 frequency) external;
}
```

#### 2. NGORegistry.sol
```solidity
// NGO verification and management
contract NGORegistry {
    function registerNGO(address ngoAddress, string memory ipfsHash) external;
    function verifyNGO(address ngoAddress) external onlyOwner;
    function isVerifiedNGO(address ngoAddress) external view returns (bool);
}
```

#### 3. RecurringDonations.sol
```solidity
// Automated recurring payments
contract RecurringDonations {
    function setupSubscription(uint256 amount, uint256 frequency) external;
    function cancelSubscription() external;
    function executePayment(address subscriber) external;
}
```

### Frontend Integration Steps

#### 1. Install Blockchain Dependencies
```bash
npm install wagmi viem @rainbow-me/rainbowkit
npm install @web3-storage/w3up-client # for IPFS
```

#### 2. Update useWallet.tsx
Add functions for:
- Contract interaction
- Transaction signing
- Event listening
- IPFS upload/download

#### 3. Create Contract Integration Hook
```typescript
// src/hooks/useContracts.ts
export const useContracts = () => {
  // Contract instances
  // Function calls
  // Event listeners
  // Transaction status
}
```

#### 4. IPFS Integration
```typescript
// src/utils/ipfs.ts
export const uploadToIPFS = async (data: any) => {
  // Encrypt sensitive data
  // Upload to IPFS
  // Return hash
}

export const downloadFromIPFS = async (hash: string) => {
  // Download from IPFS
  // Decrypt if needed
  // Return data
}
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js 18+ and npm
- MetaMask browser extension
- Polygon network configured in MetaMask

### Installation
```bash
# Clone the repository
git clone <your-repo-url>
cd periodaid

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Variables
Create `.env` file:
```env
VITE_POLYGON_RPC_URL=https://polygon-rpc.com
VITE_CONTRACT_ADDRESS=0x...
VITE_IPFS_API_KEY=your_ipfs_key
VITE_WEB3_STORAGE_KEY=your_web3_storage_key
```

## 🔧 Backend Requirements

### Database Schema (Supabase)
```sql
-- Aid requests table
CREATE TABLE aid_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    goal_amount DECIMAL(18,6) NOT NULL,
    raised_amount DECIMAL(18,6) DEFAULT 0,
    location TEXT,
    is_anonymous BOOLEAN DEFAULT false,
    is_verified BOOLEAN DEFAULT false,
    ngo_id UUID REFERENCES ngos(id),
    ipfs_hash TEXT,
    blockchain_tx_hash TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    expires_at TIMESTAMP
);

-- NGOs table
CREATE TABLE ngos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    wallet_address TEXT UNIQUE,
    is_verified BOOLEAN DEFAULT false,
    verification_documents TEXT[], -- IPFS hashes
    created_at TIMESTAMP DEFAULT NOW()
);

-- Donations table
CREATE TABLE donations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    request_id UUID REFERENCES aid_requests(id),
    donor_wallet TEXT NOT NULL,
    amount DECIMAL(18,6) NOT NULL,
    transaction_hash TEXT UNIQUE NOT NULL,
    is_recurring BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Recurring donations table
CREATE TABLE recurring_donations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    donor_wallet TEXT NOT NULL,
    amount DECIMAL(18,6) NOT NULL,
    frequency TEXT CHECK (frequency IN ('weekly', 'monthly')),
    is_active BOOLEAN DEFAULT true,
    last_payment_at TIMESTAMP,
    next_payment_at TIMESTAMP,
    total_donated DECIMAL(18,6) DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);
```

### Edge Functions Needed
1. **blockchain-donate.ts** - Handle donation transactions
2. **verify-ngo.ts** - NGO verification process  
3. **ipfs-upload.ts** - Upload data to IPFS
4. **recurring-payments.ts** - Process recurring donations
5. **proof-verification.ts** - Verify delivery proofs

## 🔒 Security Considerations

### Smart Contract Security
- Use OpenZeppelin libraries
- Implement reentrancy guards
- Add proper access controls
- Audit contracts before mainnet deployment

### Frontend Security
- Validate all user inputs
- Sanitize data before IPFS upload
- Implement proper error handling
- Use HTTPS for all API calls

### Privacy Protection
- Encrypt sensitive data before IPFS storage
- Implement proper anonymization
- Use proxy contracts for anonymous requests
- Secure key management

## 🧪 Testing Strategy

### Unit Tests
- Smart contract functions
- React component behavior
- Hook functionality
- Utility functions

### Integration Tests
- Wallet connection flow
- Contract interaction
- IPFS upload/download
- End-to-end donation process

### Testnet Deployment
1. Deploy to Polygon Mumbai testnet
2. Test with faucet tokens
3. Verify all functions work correctly
4. Performance and gas optimization

## 📊 Monitoring & Analytics

### On-Chain Metrics
- Total donations processed
- Number of active requests
- NGO verification rate
- Gas usage optimization

### User Analytics
- Donation completion rate
- User retention
- Popular request categories
- Geographic distribution

## 🚨 Important Notes

### Current Limitations
- **No Backend Integration**: Currently frontend-only, needs Supabase for full functionality
- **Mock Data**: All data is currently hardcoded for demonstration
- **No Blockchain Connection**: Wallet integration exists but no actual contract calls
- **No IPFS**: File storage not implemented
- **No Authentication**: No user login/registration system

### Next Steps Required
1. **Connect Supabase** for backend functionality
2. **Deploy Smart Contracts** on Polygon testnet
3. **Implement IPFS Integration** for file storage
4. **Add Authentication System** for users and NGOs
5. **Create Edge Functions** for blockchain interaction
6. **Add Automated Testing** for reliability
7. **Security Audit** before mainnet deployment

### Production Checklist
- [ ] Smart contracts audited and deployed
- [ ] Frontend connected to contracts
- [ ] IPFS integration working
- [ ] NGO verification process implemented
- [ ] Recurring donations automated
- [ ] Security measures in place
- [ ] Error handling comprehensive
- [ ] Gas optimization completed
- [ ] User documentation created
- [ ] Support system established

## 📞 Support & Development

For questions about implementation or to request features, please refer to the project documentation or contact the development team.

Remember: This is a proof-of-concept that requires backend integration and smart contract deployment to become fully functional.