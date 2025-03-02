# GitHub Recruiter Tool

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Live Demo](https://img.shields.io/badge/demo-online-green.svg)](https://github-recruiter.example.com)

A powerful tool built during a 48-hour hackathon to help technical recruiters evaluate GitHub profiles and make data-driven hiring decisions.

## 🔗 Live Demo

[GitHub Recruiter Tool](https://github-recruiter.example.com)

## 📋 Overview

GitHub Recruiter Tool analyzes GitHub user profiles to provide quantitative metrics and qualitative insights for technical hiring. By comparing candidate profiles against customizable standard profiles for different developer roles, it helps streamline the technical recruiting process.

## ✨ Features

- **GitHub Profile Analysis**: Pull comprehensive data from candidate GitHub profiles
- **Custom Evaluation Metrics**: Analyze commit frequency, language proficiency, repository quality, and more
- **Standard Profile Templates**: Compare candidates against role-specific standard profiles
- **Visual Comparisons**: View intuitive charts and visualizations of candidate metrics
- **Recommendation Engine**: Get hire/no-hire recommendations based on customizable criteria
- **Profile Saving**: Save candidate evaluations for future reference

## 🛠️ Tech Stack

- **Frontend**: React.js, Chart.js, Material-UI
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **External APIs**: GitHub API

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB instance
- GitHub API access token

### Installation

1. Clone the repository:

   ```bash
   https://github.com/PrashantPalve01/gitmatch-hackathon
   cd gitmatch-hack
   ```

2. Install dependencies for both frontend and backend:

   ```bash
   # Install backend dependencies
   npm install

   # Install frontend dependencies
   cd client
   npm install
   cd ..
   ```

3. Create a `.env` file in the root directory with the following variables:

   ```
   GITHUB_TOKEN=your_github_token
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   ```

4. Start the development server:

   ```bash
   # Run frontend
   npm run dev

   #  run backend
   npm start
   ```

5. Open your browser and navigate to `http://localhost:5173`

## 📊 How It Works

1. **Input a GitHub Username**: Enter the GitHub username of your candidate
2. **Select a Standard Profile**: Choose from predefined role standards or create your own
3. **Generate Analysis**: Our system fetches and analyzes the GitHub data
4. **Review Results**: Examine the comparison metrics and hiring recommendation
5. **Save or Share**: Store the results for team review or share directly with stakeholders

## 🔄 API Endpoints

- `GET /api/github/profile/:username` - Get GitHub user profile
- `GET /api/github/metrics/:username` - Get computed metrics for a user
- `POST /api/comparisons` - Create a new comparison
- `GET /api/comparisons` - List all comparisons
- `GET /api/standards` - List all standard profiles
- `POST /api/standards` - Create a new standard profile

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- [GitHub API](https://docs.github.com/en/rest) for providing the data
- [Chart.js](https://www.chartjs.org/) for visualization components
- [Material-UI](https://mui.com/) for UI components
- All the judges and organizers of the hackathon

## 🔮 Future Enhancements

- User authentication and team management
- Integration with applicant tracking systems
- Machine learning for more accurate recommendations
- Expanded metrics including code quality analysis
- Bulk candidate comparison
