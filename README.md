# 🔍 GitHub Recruiter: Developer Talent Assessment Platform

## Overview

GitHub Recruiter is an innovative web application designed to revolutionize technical recruiting by providing comprehensive insights into developer talent through advanced GitHub profile analysis.

## 🔗 Live Demo

[GitHub Recruiter Tool](https://gitmatch-hackathon-frontend.onrender.com/)

## 🌟 Key Features

- **In-Depth GitHub Profile Analysis**
  Dive deep into developers' GitHub repositories, commit history, and coding patterns to assess true potential.

- **Advanced Candidate Comparison**
  Compare candidates against customizable standard developer profiles with intuitive visual scoring.

- **Intelligent Scoring System**
  Leverage a sophisticated, weighted algorithm to generate comprehensive hire/no-hire recommendations.

- **Secure Authentication**
  Robust user authentication powered by Firebase for protected access.

## 🚀 Tech Stack

| Layer          | Technologies               |
| -------------- | -------------------------- |
| Frontend       | React.js (Vite), Chakra UI |
| Backend        | Express.js, Node.js        |
| Database       | MongoDB                    |
| Authentication | Firebase                   |
| External API   | GitHub API                 |

## 🔧 Prerequisites

Before you begin, ensure you have:

- Node.js (v14+)
- npm or yarn
- GitHub API Token
- Firebase Account

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/PrashantPalve01/gitmatch-hackathon
cd gitmatch-hackathon
```

### 2. Install Dependencies

```bash
# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
```

### 3. Environment Configuration

#### Frontend Environment (`client/.env`)

```env
VITE_API_URL=http://localhost:5000/api
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

#### Backend Environment (`server/.env`)

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
GITHUB_API_KEY=your_github_api_key
```

### 4. Run the Application

```bash
# Start backend server
cd server
npm start

# Start frontend development server
cd ../client
npm run dev
```

## 📊 Evaluation Metrics

GitHub Recruiter assesses developers across multiple dimensions:

- Commit frequency and consistency
- Diversity of programming languages
- Repository complexity and volume
- Code quality and maintainability
- Community engagement (stars, forks)
- Activity timeline and trends

## 🎯 Scoring Mechanism

- Configurable standard developer profiles
- Machine learning-enhanced scoring algorithm
- Comprehensive strengths and weaknesses analysis
- Objective hire/no-hire recommendations

## 🔮 Roadmap

- [ ] Implement advanced machine learning models
- [ ] Develop more granular skill assessment techniques
- [ ] Add integrations with additional developer platforms
- [ ] Create advanced reporting and visualization features

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📧 Contact

Project Maintainer: Prashant Palve

- GitHub: [@PrashantPalve01](https://github.com/PrashantPalve01)

---

**Built with ❤️ for recruiters and developers**
