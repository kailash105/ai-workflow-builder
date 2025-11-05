# 🧠 AI Workflow Builder

**AI Workflow Builder** is a visual node-based pipeline editor built using **React Flow** and **FastAPI**.
It allows users to design, connect, and configure nodes like Text, Prompt Template, Join, and more — while validating pipeline structure (DAG check) through backend integration.

---

## 🚀 Features

* 🔧 **Modular Node Architecture** — Easily create new node types using a reusable `NodeShell` and `buildNode()` system.
* 🧩 **Dynamic Text Nodes** — Automatically detect `{{variables}}` and generate handles for dynamic connections.
* 🎨 **Modern UI** — Clean React + Vite setup with unified styling for all node components.
* ⚙️ **Backend Integration** — FastAPI backend checks if the node graph forms a valid Directed Acyclic Graph (DAG).
* 🔁 **Real-time Updates** — Instant feedback when nodes or edges are changed and submitted.

---

## 🛠️ Tech Stack

**Frontend:** React + Vite + React Flow
**Backend:** Python + FastAPI
**Styling:** Vanilla CSS (can be replaced with Tailwind or ShadCN UI)
**Validation:** DAG check using Kahn’s Algorithm

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/kailash105/ai-workflow-builder.git
cd ai-workflow-builder
```

---

### 2️⃣ Backend Setup (FastAPI)

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate       # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

🟢 **Backend running at:** `http://127.0.0.1:8000`

---

### 3️⃣ Frontend Setup (React + Vite)

In a new terminal:

```bash
cd frontend
npm install
npm run dev
```

🟢 **Frontend running at:** `http://localhost:5173`

---

## 🧠 How It Works

1. Add and connect nodes visually in the React Flow canvas.
2. Use the **Text Node** to type content with variables like `{{input}}`.
   → Left handles appear automatically for each variable.
3. Click **Submit Pipeline** to send node/edge data to the FastAPI backend.
4. Backend returns:

   ```json
   {
     "num_nodes": 6,
     "num_edges": 5,
     "is_dag": true
   }
   ```
5. The frontend displays the result in an alert or toast.

---

## 🧩 Example Nodes

| Node Type                    | Description                                      |
| ---------------------------- | ------------------------------------------------ |
| **Text Node**                | Dynamic text with variable handle detection.     |
| **Prompt Template Node**     | Defines prompt structures using input variables. |
| **Join Text Node**           | Combines two inputs with a custom separator.     |
| **Delay Node**               | Simulates asynchronous or timed flow.            |
| **Regex Extract Node**       | Extracts pattern matches from text.              |
| **Math Add Node (Optional)** | Demonstrates how easily new nodes can be added.  |

---

## 📁 Project Structure

```
ai-workflow-builder/
├── backend/
│   ├── main.py
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── App.jsx
    │   ├── nodes/
    │   │   ├── NodeShell.jsx
    │   │   ├── factory.jsx
    │   │   ├── TextNode.jsx
    │   │   └── custom/
    │   │       └── index.jsx
    │   ├── flow/
    │   │   └── useNodeDataUpdater.js
    │   └── submit.js
    ├── package.json
    └── vite.config.js
```

---

## 📸 Screenshot
<img width="1439" height="690" alt="Screenshot 2025-11-05 at 10 29 58 PM" src="https://github.com/user-attachments/assets/16d66323-455d-457e-8498-dad9c58d3c74" />
<img width="442" height="201" alt="Screenshot 2025-11-05 at 10 30 28 PM" src="https://github.com/user-attachments/assets/c205277d-6a76-4196-8993-136576ed8cef" />




---

## 👨‍💻 Author

**Kailash Khadarabad**
🔗 [LinkedIn](https://www.linkedin.com/in/kailash-khadarabad-149660156/)
📧 [kailashkbc2@gmail.com](mailto:kailashkbc2@gmail.com)

---

## 🏁 Summary

AI Workflow Builder demonstrates how a modular, abstract React Flow editor can integrate with a FastAPI backend to create, validate, and visualize intelligent node-based pipelines.
It’s flexible, scalable, and easy to extend — perfect for workflow design, automation tools, or AI orchestration dashboards.

---
