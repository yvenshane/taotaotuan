# TaoTaoTuan

A full-stack application with Taro frontend and Node.js backend.

## Project Structure

```
taotaotuan/
├── frontend/         # Taro frontend application
│   ├── src/          # Source code
│   ├── config/       # Configuration files
│   └── ...
│
├── backend/          # Node.js backend application
│   ├── src/          # Source code
│   │   ├── controllers/  # Request handlers
│   │   ├── models/       # Database models
│   │   ├── routes/       # API routes
│   │   ├── services/     # Business logic
│   │   ├── utils/        # Utility functions
│   │   └── app.js        # Entry point
│   └── ...
└── README.md         # Project documentation
```

## Getting Started

### Frontend

```bash
cd frontend
yarn install
yarn dev:weapp  # For WeChat Mini Program
# or
yarn dev:h5     # For H5
```

### Backend

```bash
cd backend
npm install
npm run dev
```

## Features

- Frontend: Taro-based application supporting multiple platforms
- Backend: Express.js API server
