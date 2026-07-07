# 💻 CodeWithFun - Online Compiler

> An interactive online compiler supporting multiple programming languages right in your browser

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Compiler](https://img.shields.io/badge/Compiler-Online-blue?style=for-the-badge)

---

## 📚 Overview

CodeWithFun is an interactive online compiler that allows you to write, compile, and execute code in multiple programming languages directly from your browser without any setup or installation.

**Perfect for:** Learning, practicing, teaching, and quick code testing

---

## 🎯 Features

- ✅ **Multiple Languages** - Java, Python, C++, JavaScript, C#, Go, Rust
- ✅ **Real-time Compilation** - Instant feedback on code execution
- ✅ **Syntax Highlighting** - Beautiful code editor with theme support
- ✅ **Code Snippets** - Pre-made templates for quick start
- ✅ **Input/Output Panel** - Easy input handling and output viewing
- ✅ **Error Highlighting** - Clear error messages and line numbers
- ✅ **Theme Support** - Light and dark modes
- ✅ **Responsive Design** - Works on desktop, tablet, and mobile
- ✅ **Code Sharing** - Share code snippets with others
- ✅ **Fast Execution** - Optimized backend for quick compilation

---

## 🛠️ Technologies Used

| Frontend | Backend | Infrastructure |
|----------|---------|----------------|
| React | Node.js | Docker |
| Monaco Editor | Express | AWS/Cloud |
| Redux | Judge0 API | REST APIs |
| Tailwind CSS | Python | Database |

---

## 📂 Project Structure

```
CodeWithFun/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Editor.jsx
│   │   │   ├── OutputPanel.jsx
│   │   │   ├── LanguageSelector.jsx
│   │   │   └── CodeSnippets.jsx
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── styles/
│   │   └── App.jsx
│   └── package.json
├── backend/
│   ├── routes/
│   │   ├── compile.js
│   │   └── snippets.js
│   ├── controllers/
│   ├── middleware/
│   ├── server.js
│   └── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 14+
- npm or yarn
- Modern web browser

### Installation

```bash
# Clone repository
git clone https://github.com/srinath39/CodeWithFun.git

# Navigate to directory
cd CodeWithFun

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install

# Start backend server
node server.js
# Server runs on http://localhost:5000

# In another terminal, start frontend
cd ../frontend
npm start
# Frontend runs on http://localhost:3000
```

---

## 💻 Supported Languages

| Language | Version | Example |
|----------|---------|----------|
| **Java** | 11+ | Compile and run with `main` method |
| **Python** | 3.9+ | Interpreted execution |
| **C++** | C++17 | Using g++ compiler |
| **C** | C11 | Using gcc compiler |
| **JavaScript** | ES6+ | Node.js runtime |
| **C#** | 9+ | Mono framework |
| **Go** | 1.16+ | Go runtime |
| **Rust** | Latest | Rust compiler |

---

## 🎮 How to Use

### Basic Workflow

1. **Select Language** - Choose from dropdown menu
2. **Write Code** - Type or paste your code
3. **Add Input** - Provide input if needed
4. **Run** - Click compile button or press Ctrl+Enter
5. **View Output** - See results in output panel

### Code Examples

#### Python Hello World
```python
print("Hello, CodeWithFun!")
name = input("Enter your name: ")
print(f"Welcome, {name}!")
```

#### Java Example
```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, CodeWithFun!");
    }
}
```

#### C++ Example
```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, CodeWithFun!" << endl;
    return 0;
}
```

#### JavaScript Example
```javascript
const greet = (name) => {
    console.log(`Hello, ${name}!`);
};

greet("CodeWithFun");
```

---

## 🎨 Features in Detail

### Code Snippets
Pre-written templates for quick learning:
- Hello World programs
- Data structures implementations
- Algorithm examples
- Basic I/O operations
- Function/Method examples

### Theme Support
- **Light Theme** - Easy on the eyes
- **Dark Theme** - Reduced eye strain
- **High Contrast** - Accessibility support

### Code Sharing
```
Generated Link: https://codewithfun.com/share/abc123def456
Shared code maintains language, code content, and input
```

### Keyboard Shortcuts
| Shortcut | Action |
|----------|--------|
| Ctrl+Enter | Run code |
| Ctrl+/ | Toggle comment |
| Tab | Indent |
| Shift+Tab | Outdent |
| Ctrl+S | Save code |
| Ctrl+Z | Undo |
| Ctrl+Y | Redo |

---

## 🔧 API Endpoints

### Compile Code
```http
POST /api/compile
Content-Type: application/json

{
  "language": "python",
  "code": "print('Hello')",
  "input": ""
}

Response:
{
  "output": "Hello\n",
  "error": null,
  "executionTime": 0.234
}
```

### Get Snippets
```http
GET /api/snippets?language=python

Response:
{
  "snippets": [
    {
      "id": 1,
      "title": "Hello World",
      "code": "print('Hello, World!')",
      "language": "python"
    }
  ]
}
```

---

## 📊 Execution Time Limits

| Language | Time Limit | Memory Limit |
|----------|-----------|---------------|
| Python | 5s | 256MB |
| Java | 10s | 512MB |
| C++ | 5s | 256MB |
| JavaScript | 5s | 256MB |
| C# | 10s | 512MB |
| Go | 5s | 256MB |
| Rust | 5s | 256MB |

---

## 💡 Use Cases

✅ **Learning** - Practice programming without installation  
✅ **Teaching** - Live coding demonstrations  
✅ **Interviews** - Code pair programming  
✅ **Debugging** - Quick testing of code snippets  
✅ **Prototyping** - Rapid algorithm development  
✅ **Documentation** - Embedded code examples  
✅ **Competitive Programming** - Algorithm practice  

---

## 🚀 Performance Optimizations

- ✨ Code syntax highlighting caching
- ✨ Lazy loading of language parsers
- ✨ Memoized compilation results
- ✨ Optimized backend with queue system
- ✨ CDN for static assets
- ✨ Service workers for offline support

---

## 🤝 Contributing

Contributions welcome! Help us add more features:

```bash
# Create feature branch
git checkout -b feature/new-language

# Make changes
# Commit and push
git push origin feature/new-language
```

---

## 📄 License

MIT License - Free to use for educational purposes

---

## 🏆 Future Enhancements

- 🎯 Support for more languages (PHP, Ruby, Kotlin)
- 🎯 Collaboration features (real-time editing)
- 🎯 Code templates and solutions database
- 🎯 Performance benchmarking tools
- 🎯 Custom judging system for competitions
- 🎯 IDE plugins and extensions

---

**Start Coding with Fun Today! 🎉**