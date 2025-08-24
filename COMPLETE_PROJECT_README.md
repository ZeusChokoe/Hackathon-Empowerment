# FemEmpowerChain - Complete Project Documentation

## 🌟 Project Overview

FemEmpowerChain is a comprehensive blockchain-powered platform designed to empower South African women through micro-loans, education, healthcare support, transparent aid distribution, and the new PeriodAid donation system for menstrual health.

## 📁 Complete File Structure & Detailed Functions

### 🏗️ Root Configuration Files

#### `README.md`
**Purpose**: Project setup and deployment instructions
**Content**: 
- Project URL and editing instructions
- Development setup (Node.js, npm commands)
- Deployment instructions via ZeusFactor
- Custom domain connection guide

#### `index.html`
**Purpose**: Main HTML template and SEO configuration
**Content**:
- Meta tags for SEO optimization
- Open Graph and Twitter Card configurations
- Title: "FemEmpowerChain - Empowering South African Women Through Blockchain"
- Favicon and social media image references
- Root div for React application mounting

#### `package.json` (Read-only)
**Purpose**: Project dependencies and scripts
**Dependencies**: React, TypeScript, Tailwind, Vite, Blockchain libraries, UI components

#### `tailwind.config.ts`
**Purpose**: Tailwind CSS configuration and design system
**Configuration**:
- Theme colors and design tokens
- Component styling extensions
- Responsive breakpoints
- Animation configurations

#### `vite.config.ts`
**Purpose**: Vite build tool configuration
**Configuration**:
- Development server settings
- Build optimization
- Plugin configurations
- Path aliases (@/ for src/)

### 🎯 Core Application Files

#### `src/main.tsx`
**Purpose**: Application entry point
**Functions**:
- `main()` - Renders App component into DOM
- Strict mode wrapper for development
- Root element mounting

#### `src/App.tsx`
**Purpose**: Main application router and global providers
**Functions**:
- `App()` - Root component with complete routing setup
- **Providers Setup**:
  - QueryClientProvider for data fetching
  - TooltipProvider for UI tooltips
  - Toaster components for notifications
- **Routing Configuration**:
  - `/` → Index (main landing page)
  - `/periodaid` → PeriodAid (donation platform)
  - `/safereport` → SafeReportApp (reporting system)
  - `/track` → ApplicationTracker (application tracking)
  - `*` → NotFound (404 page)

#### `src/pages/Index.tsx`
**Purpose**: Main landing page with all platform sections
**Functions**:
- `Index()` - Main page component orchestrating all sections
- **Component Integration**:
  - Header (navigation and wallet)
  - Hero (main banner)
  - LoanApplication (micro-loan requests)
  - Education (educational resources)
  - HealthcareSupport (healthcare assistance)
  - DonorPortal (donation campaigns)
  - Footer (site footer)

#### `src/pages/NotFound.tsx`
**Purpose**: 404 error page
**Functions**:
- `NotFound()` - Displays user-friendly 404 page
- Navigation back to home page
- Error state handling

### 🎨 Design System & Utilities

#### `src/index.css`
**Purpose**: Global CSS styles and design system tokens
**Features**:
- CSS custom properties for colors
- Gradient definitions
- Shadow and animation utilities
- Dark/light theme support
- Semantic color tokens

#### `src/lib/utils.ts`
**Purpose**: Utility functions for the application
**Functions**:
- `cn(...inputs)` - Combines and merges Tailwind CSS classes
- Uses `clsx` and `twMerge` for optimal class handling

#### `src/App.css`
**Purpose**: Additional application-specific styles
**Content**: Supplementary CSS styles not covered by Tailwind

### 💰 Wallet & Blockchain Integration

#### `src/hooks/useWallet.tsx`
**Purpose**: Ethereum wallet connection and management
**Interface**: `WalletState`
- `address: string | null` - Connected wallet address
- `isConnected: boolean` - Connection status
- `isConnecting: boolean` - Loading state
- `ethBalance: number` - ETH balance
- `tokenBalance: number` - Token balance
- `usdcBalance: number` - USDC balance
- `gasPrice: number` - Current gas price

**Functions**:
- `useWallet()` - Main hook returning wallet state and functions
- `connectWallet()` - Connects to MetaMask/Web3 wallet
- `disconnectWallet()` - Disconnects and resets wallet state
- `fetchBalances()` - Simulates fetching crypto balances and gas prices
- `updateBalances()` - Periodic balance updates (every 30 seconds)
- `estimateGas(to, value, data?)` - Calculates gas fees for transactions
- `formatAddress(address)` - Formats address for display (0x1234...5678)
- `convertUSDToZAR(usdAmount)` - Converts USD to South African Rand
- `convertETHToZAR(ethAmount)` - Converts ETH to ZAR

### 📝 Form Management

#### `src/hooks/useFormValidation.tsx`
**Purpose**: Form validation and state management
**Interfaces**:
- `ValidationRule` - Individual field validation rules
- `ValidationRules` - Object mapping field names to rules
- `ValidationErrors` - Error messages for fields
- `FormData` - Form data structure

**Functions**:
- `useFormValidation(rules, initialData)` - Main form validation hook
- `validateField(name, value)` - Validates single field against rules
- `validateAll()` - Validates all form fields, returns boolean
- `handleChange(name, value)` - Updates form data with real-time validation
- `handleBlur(name)` - Marks field as touched and validates
- `handleSubmit(onSubmit)` - Handles form submission with validation
- `reset()` - Resets form to initial state

**Validation Types**:
- `required` - Field must have value
- `minLength` - Minimum character count
- `maxLength` - Maximum character count
- `pattern` - Regex pattern validation
- `custom` - Custom validation function

### 📊 Data Management

#### `src/hooks/useLiveData.tsx`
**Purpose**: Real-time data simulation and live updates
**Functions**:
- `useLiveData()` - Provides live updating data for education programs
- Simulates real-time progress updates
- Returns education program data with progress tracking

#### `src/hooks/useApplicationTracker.tsx`
**Purpose**: Application tracking functionality
**Functions**:
- `useApplicationTracker()` - Manages application tracking state
- Provides application status updates
- Handles application progression through stages

#### `src/hooks/use-mobile.tsx`
**Purpose**: Mobile device detection
**Functions**:
- `useIsMobile()` - Detects if device is mobile
- Returns boolean for responsive design decisions

### 🧩 Main Platform Components

#### `src/components/Header.tsx`
**Purpose**: Navigation header with wallet integration
**Functions**:
- `Header()` - Main header component with navigation and wallet display
- **State Management**:
  - `isMenuOpen` - Mobile menu toggle state
- **Navigation Links**:
  - PeriodAid (replaced Dashboard)
  - Loans
  - Education
  - Donate
  - SafeReport
- **Wallet Display**:
  - Connection status
  - ETH and USDC balances
  - Formatted wallet address
  - Connect/disconnect functionality
- **Responsive Design**:
  - Desktop navigation bar
  - Mobile hamburger menu
  - Wallet balance badges

#### `src/components/Hero.tsx`
**Purpose**: Main hero section with call-to-action
**Functions**:
- `Hero()` - Hero banner component
- Displays main value proposition
- Call-to-action buttons
- Background gradient and styling

#### `src/components/Footer.tsx`
**Purpose**: Site footer with links and information
**Functions**:
- `Footer()` - Footer component with site links
- Contact information
- Social media links
- Copyright information

### 💳 Financial Components

#### `src/components/LoanApplication.tsx`
**Purpose**: Micro-loan application form with blockchain integration
**Functions**:
- `LoanApplication()` - Main loan application component
- **Form Integration**:
  - Uses `useFormValidation` hook for form management
  - Validation rules for all loan fields
- **Wallet Integration**:
  - Checks wallet connection before submission
  - Validates sufficient balance for gas fees
  - Estimates transaction costs
- **Form Fields**:
  - Personal information (name, ID, contact)
  - Loan details (amount, purpose, term)
  - Business information
  - Employment status
- **Submission Process**:
  - Form validation
  - Wallet balance verification
  - Simulated blockchain transaction
  - Success/error notifications

#### `src/components/DonorPortal.tsx`
**Purpose**: Donation campaigns and donor management
**Functions**:
- `DonorPortal()` - Main donor portal component
- **State Management**:
  - `selectedCampaign` - Currently selected campaign
  - `donationAmount` - Donation amount input
  - Campaign modal visibility
- **Campaign Features**:
  - Campaign browsing with progress bars
  - Goal tracking and supporter counts
  - Category filtering (Education, Healthcare, Emergency)
- **Donation Process**:
  - `handleDonate(campaignId, amount)` - Processes donations
  - Wallet connection verification
  - Balance checking
  - Gas estimation
  - Transaction simulation
- **Campaign Modal**:
  - Detailed campaign information
  - Donation form with validation
  - Impact metrics display

### 🎓 Education Components

#### `src/components/Education.tsx`
**Purpose**: Educational resources and program management
**Functions**:
- `Education()` - Main education component with program tracking
- **Program Management**:
  - Live data integration using `useLiveData` hook
  - Progress tracking for enrolled programs
  - Healthcare program enrollment
- **Educational Content**:
  - Blockchain education modules
  - Financial literacy resources
  - Healthcare information
- **Interactive Features**:
  - `handleEnroll(programId)` - Program enrollment with wallet verification
  - `handleHealthcareAction(action)` - Healthcare program actions
  - Progress indicators and completion tracking
- **Program Categories**:
  - Blockchain Technology
  - Financial Literacy
  - Digital Marketing
  - Healthcare Programs

#### `src/components/BlockchainEducation.tsx`
**Purpose**: Blockchain-specific educational content
**Functions**:
- `BlockchainEducation()` - Blockchain education module
- Cryptocurrency basics
- Smart contract education
- DeFi concepts

### 🏥 Healthcare Components

#### `src/components/HealthcareSupport.tsx`
**Purpose**: Healthcare assistance and support services
**Functions**:
- `HealthcareSupport()` - Healthcare support component
- Medical assistance programs
- Health insurance information
- Emergency healthcare contacts

### 📊 Dashboard & Tracking

#### `src/components/Dashboard.tsx`
**Purpose**: User dashboard with overview metrics
**Functions**:
- `Dashboard()` - Main dashboard component
- User statistics and progress
- Quick access to platform features
- Performance metrics

#### `src/components/ApplicationTracker.tsx`
**Purpose**: Application tracking and status monitoring
**Functions**:
- `ApplicationTracker()` - Application tracking component
- **Tracking Features**:
  - Application status updates
  - Progress through approval stages
  - Document submission tracking
  - Notification system
- **Status Management**:
  - Pending applications
  - Approved/rejected status
  - Payment processing status

#### `src/components/ImpactCharts.tsx`
**Purpose**: Visual impact metrics and analytics
**Functions**:
- `ImpactCharts()` - Impact visualization component
- Charts for donation impact
- User engagement metrics
- Platform growth statistics

### 🆘 SafeReport System

#### `src/components/SafeReportApp.tsx`
**Purpose**: Main SafeReport application for incident reporting
**Functions**:
- `SafeReportApp()` - Main SafeReport component with navigation
- **State Management**:
  - `currentPage` - Current view/page
  - Mock data for reports, donations, votes
- **Data Structures**:
  - `Report` interface for incident reports
  - `Donation` interface for report-related donations
  - `Vote` interface for community voting
- **Navigation Functions**:
  - `navigateTo(page)` - Page navigation
  - `addReport(report)` - Adds new incident report
  - `addDonation(donation)` - Processes donations for reports
  - `updateReportStatus(id, status)` - Updates report status
  - `updateReportWithVerification(...)` - Adds verification data
  - `addVote(vote)` - Community voting functionality
- **Page Management**:
  - `getPageTitle()` - Dynamic page titles
  - `getPageSubtitle()` - Dynamic page subtitles
  - `renderCurrentPage()` - Renders current page component

#### SafeReport Sub-Components

##### `src/components/safereport/NavigationHeader.tsx`
**Purpose**: SafeReport navigation header
**Functions**:
- `NavigationHeader()` - Navigation component with page info
- `handleBackToMain()` - Returns to main FemEmpowerChain site
- `getPageIcon(currentPage)` - Returns appropriate icon for current page
- **Navigation Features**:
  - Current page display with icon and title
  - Navigation buttons for all SafeReport pages
  - "System Online" status indicator
  - Responsive navigation for mobile

##### `src/components/safereport/SafeReportHome.tsx`
**Purpose**: SafeReport dashboard and overview
**Functions**:
- `SafeReportHome()` - Home dashboard component
- Statistics display
- Recent activity overview
- Quick action buttons

##### `src/components/safereport/SafeReportReport.tsx`
**Purpose**: Incident reporting form and management
**Functions**:
- `SafeReportReport()` - Report submission and management
- Report form with validation
- Incident categorization
- Anonymous reporting options

##### `src/components/safereport/SafeReportDonations.tsx`
**Purpose**: Donation management for reports
**Functions**:
- `SafeReportDonations()` - Donation processing for incidents
- Donation tracking
- Fund allocation
- Transparency features

##### `src/components/safereport/SafeReportNGO.tsx`
**Purpose**: NGO management and verification
**Functions**:
- `SafeReportNGO()` - NGO portal and verification
- NGO registration
- Verification processes
- Report review capabilities

##### `src/components/safereport/SafeReportDAO.tsx`
**Purpose**: Decentralized governance system
**Functions**:
- `SafeReportDAO()` - DAO governance interface
- Community voting
- Proposal management
- Governance token integration

##### Additional SafeReport Components:
- `ContractStructure.tsx` - Smart contract information
- `DonationReceipt.tsx` - Donation receipt generation
- `ReputationSystem.tsx` - User reputation tracking
- `VerificationSystem.tsx` - Report verification process
- `WalletBalance.tsx` - Wallet integration for SafeReport

### 💝 PeriodAid System

#### `src/components/PeriodAid.tsx`
**Purpose**: Blockchain donations for menstrual health support
**Functions**:
- `PeriodAid()` - Main PeriodAid donation platform
- **State Management**:
  - `selectedTab` - Active tab (browse/recurring/submit/education/impact)
  - `selectedRequest` - Currently selected aid request
  - `donationAmount` - One-time donation amount
  - `recurringAmount` - Recurring donation amount
  - `recurringFrequency` - Weekly/monthly frequency

**Data Structures**:
- `AidRequest` interface:
  - `id, title, description` - Request details
  - `goalAmount, raisedAmount` - Financial targets and progress
  - `category, location` - Request categorization
  - `isAnonymous, isVerified` - Privacy and verification status
  - `ngoName, timeLeft` - NGO association and timing
  - `supportersCount, proofDocuments` - Community support and verification

- `RecurringDonation` interface:
  - `id, amount, frequency` - Donation details
  - `isActive, totalDonated` - Status and history
  - `startDate` - Initiation timestamp

**Core Functions**:
- `handleDonate(requestId, amount)` - Processes individual donations
  - Wallet connection verification
  - Balance checking
  - Transaction processing
  - Success/error notifications

- `handleRecurringSetup()` - Configures recurring donations
  - Recurring payment setup
  - Wallet balance verification
  - Subscription management

**Tab Features**:
1. **Browse Requests** - View and donate to aid requests
2. **Recurring Donations** - Set up automated donations
3. **Submit Request** - Request menstrual health support
4. **Education** - Menstrual health resources
5. **Impact Dashboard** - Donation impact metrics

### 🔧 Loading & UI States

#### `src/components/LoadingStates.tsx`
**Purpose**: Loading indicators and skeleton screens
**Functions**:
- `LoadingStates()` - Various loading state components
- Skeleton screens for better UX
- Loading spinners and indicators

#### `src/components/OnboardingFlow.tsx`
**Purpose**: User onboarding process
**Functions**:
- `OnboardingFlow()` - Guides new users through platform
- Step-by-step introduction
- Feature explanations
- Initial setup assistance

### 🎨 UI Component Library

#### Shadcn/UI Components (src/components/ui/)

All UI components follow the Shadcn/UI design system with customizations:

##### `src/components/ui/button.tsx`
**Purpose**: Reusable button component with variants
**Functions**:
- `Button()` - Main button component with forwarded refs
- `buttonVariants()` - CVA function for styling variants
**Variants**:
- `default, destructive, outline, secondary, ghost, link`
- `hero, empowerment, donate` - Custom variants
**Sizes**: `default, sm, lg, icon`

##### `src/components/ui/card.tsx`
**Purpose**: Card container components
**Components**:
- `Card` - Main card container
- `CardHeader` - Card header section
- `CardTitle` - Card title component
- `CardDescription` - Card description text
- `CardContent` - Main card content area
- `CardFooter` - Card footer section

##### `src/components/ui/chart.tsx`
**Purpose**: Chart components using Recharts
**Functions**:
- `ChartContainer()` - Chart wrapper with theming
- `ChartTooltip()` - Custom tooltip component
- `ChartTooltipContent()` - Tooltip content formatting
- `ChartLegend()` - Chart legend component
- `ChartLegendContent()` - Legend content rendering
- `useChart()` - Hook for chart configuration
- `getPayloadConfigFromPayload()` - Config helper function

##### Form Components:
- `Input` - Text input fields
- `Label` - Form labels
- `Textarea` - Multi-line text input
- `Select` - Dropdown selection
- `Checkbox` - Checkbox input
- `RadioGroup` - Radio button groups
- `Switch` - Toggle switches
- `Slider` - Range sliders

##### Navigation Components:
- `Tabs` - Tab navigation
- `NavigationMenu` - Main navigation
- `Breadcrumb` - Breadcrumb navigation
- `Pagination` - Page navigation

##### Feedback Components:
- `Toast` - Notification toasts
- `Alert` - Alert messages
- `Progress` - Progress bars
- `Badge` - Status badges
- `Skeleton` - Loading skeletons

##### Overlay Components:
- `Dialog` - Modal dialogs
- `Sheet` - Side panels
- `Popover` - Popup content
- `Tooltip` - Hover tooltips
- `HoverCard` - Hover cards
- `ContextMenu` - Right-click menus
- `DropdownMenu` - Dropdown menus

##### Data Display:
- `Table` - Data tables
- `Avatar` - User avatars
- `Calendar` - Date picker
- `Accordion` - Collapsible content
- `Collapsible` - Toggle content

### 📱 Responsive & Interaction Hooks

#### `src/hooks/use-toast.ts`
**Purpose**: Toast notification management
**Functions**:
- `useToast()` - Hook for displaying toast notifications
- `toast()` - Function to trigger notifications
- `dismiss()` - Dismiss specific toasts

#### `src/hooks/use-mobile.tsx`
**Purpose**: Mobile device detection
**Functions**:
- `useIsMobile()` - Detects mobile devices for responsive design
- Returns boolean based on screen width

## 🚀 Development Workflow

### File Dependencies & Relationships

```
App.tsx (Router)
├── pages/Index.tsx (Main Page)
│   ├── components/Header.tsx (Navigation + Wallet)
│   │   └── hooks/useWallet.tsx (Blockchain Integration) 
│   ├── components/Hero.tsx (Hero Section)
│   ├── components/LoanApplication.tsx (Loans)
│   │   └── hooks/useFormValidation.tsx (Form Management)
│   ├── components/Education.tsx (Education)
│   │   └── hooks/useLiveData.tsx (Real-time Data)
│   ├── components/HealthcareSupport.tsx (Healthcare)
│   ├── components/DonorPortal.tsx (Donations)
│   └── components/Footer.tsx (Footer)
├── components/PeriodAid.tsx (Period Aid Platform)
├── components/SafeReportApp.tsx (Incident Reporting)
│   └── components/safereport/* (SafeReport Modules)
└── components/ApplicationTracker.tsx (Application Tracking)
```

### Key Integration Points

1. **Wallet Integration**: All financial components use `useWallet` hook
2. **Form Management**: Forms use `useFormValidation` for consistency
3. **Design System**: All components use semantic tokens from `index.css`
4. **Toast Notifications**: Components use `useToast` for user feedback
5. **Responsive Design**: Components use `useIsMobile` for mobile adaptation

## 📋 Implementation Status

### ✅ Completed Features
- Complete React/TypeScript frontend structure
- Wallet connection and balance display
- Form validation system
- Responsive design system
- Mock data for all features
- Navigation and routing
- UI component library
- Toast notifications

### ⚙️ Requires Backend Integration
- **Authentication System** - User login/registration
- **Database Storage** - Persistent data storage
- **Blockchain Transactions** - Actual smart contract calls
- **IPFS Integration** - Decentralized file storage
- **Payment Processing** - Real donation/loan processing
- **Email Notifications** - User communications
- **KYC/Verification** - Identity verification for loans

### 🔗 Smart Contract Integration Needed
- **Loan Contracts** - Micro-loan escrow and repayment
- **Donation Contracts** - Transparent donation processing
- **PeriodAid Contracts** - Menstrual health donation escrow
- **SafeReport Contracts** - Incident reporting and verification
- **Token Contracts** - Platform utility tokens
- **Governance Contracts** - DAO voting and proposals

## 🛠️ Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run type-check

# Linting
npm run lint
```

## 📝 Notes for Developers

### Code Style Guidelines
- Use TypeScript for all new components
- Follow functional component patterns with hooks
- Implement proper error boundaries
- Use semantic tokens from design system
- Add proper TypeScript interfaces for all data structures

### Performance Considerations
- Lazy load heavy components
- Implement proper caching strategies
- Optimize wallet connection handling
- Use React.memo for expensive components
- Implement virtualization for large lists

### Security Best Practices
- Validate all user inputs
- Sanitize data before blockchain transactions
- Implement proper error handling
- Use secure wallet connection practices
- Validate smart contract interactions

This documentation provides a complete overview of every file and function in the FemEmpowerChain platform. Each component is designed to work together to create a comprehensive blockchain-powered empowerment platform for South African women.