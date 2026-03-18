import { useState, useEffect } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import "./index.css";

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('data-analytics-modules-todos');
    let initialTodos;
    if (saved) {
      initialTodos = JSON.parse(saved);
    } else {
      initialTodos = [
        { 
          id: '1', 
          text: 'Course 1: Foundations: Data, Data, Everywhere', 
          completed: false,
          details: [
            'Define and explain key concepts involved in data analytics including data, data analysis, and data ecosystems.',
            'Conduct an analytical thinking self assessment giving specific examples of the application of analytical thinking.',
            'Discuss the role of spreadsheets, query languages, and data visualization tools in data analytics.',
            'Describe the role of a data analyst with specific reference to jobs.'
          ],
          modules: [
            'Introducing data analytics and analytical thinking',
            'The wonderful world of data',
            'Set up your data analytics toolbox',
            'Become a fair and impactful data professional'
          ]
        },
        { 
          id: '2', 
          text: 'Course 2: Ask Questions to Make Data-Driven Decisions', 
          completed: false,
          details: [
            'Explain how the problem-solving road map applies to typical analysis scenarios.',
            'Discuss the use of data in the decision-making process.',
            'Demonstrate the use of spreadsheets to complete basic tasks of the data analyst including entering and organizing data.',
            'Describe the key ideas associated with structured thinking.'
          ],
          modules: [
            'Ask effective questions',
            'Make data-driven decisions',
            'Spreadsheet magic',
            'Always remember the stakeholder'
          ]
        },
        { 
          id: '3', 
          text: 'Course 3: Prepare Data for Exploration', 
          completed: false,
          details: [
            'Explain what factors to consider when making decisions about data collection.',
            'Discuss the difference between biased and unbiased data.',
            'Describe databases with references to their functions and components.',
            'Describe best practices for organizing data.'
          ],
          modules: [
            'Data types and structures',
            'Data responsibility',
            'Database essentials',
            'Organize and protect data',
            'Engage in the data community'
          ]
        },
        { 
          id: '4', 
          text: 'Course 4: Process Data from Dirty to Clean', 
          completed: false,
          details: [
            'Define different types of data integrity and identify risks to data integrity.',
            'Apply basic SQL functions to clean string variables in a database.',
            'Develop basic SQL queries for use on databases.',
            'Describe the process of verifying data cleaning results.'
          ],
          modules: [
            'The importance of integrity',
            'Clean data for more accurate insights',
            'Data cleaning with SQL',
            'Verify and report on cleaning results',
            'Add data to your resume',
            'Course wrap-up'
          ]
        },
        { 
          id: '5', 
          text: 'Course 5: Analyze Data to Answer Questions', 
          completed: false,
          details: [
            'Discuss the importance of organizing your data before analysis by using sorts and filters.',
            'Convert and format data.',
            'Apply the use of functions and syntax to create SQL queries to combine data from multiple database tables.',
            'Describe the use of functions to conduct basic calculations on data in spreadsheets.'
          ],
          modules: [
            'Organize data for more effective analysis',
            'Format and adjust data',
            'Aggregate data for analysis',
            'Perform data calculations'
          ]
        },
        { 
          id: '6', 
          text: 'Course 6: Share Data Through the Art of Visualization', 
          completed: false,
          details: [
            'Describe the use of data visualizations to talk about data and the results of data analysis.',
            'Identify Tableau as a data visualization tool and understand its uses.',
            'Explain what data driven stories are including reference to their importance and their attributes.',
            'Explain principles and practices associated with effective presentations.'
          ],
          modules: [
            'Visualize data',
            'Create data visualizations with Tableau',
            'Craft data stories',
            'Develop presentations and slideshows'
          ]
        },
        { 
          id: '7', 
          text: 'Course 7: Introduction to Data Analysis Using Python', 
          completed: false,
          details: [
            'Explain how Python is used by data professionals',
            'Explore basic Python building blocks, including syntax and semantics',
            'Understand loops, control statements, and string manipulation',
            'Use data structures to store and organize data'
          ],
          modules: [
            'Hello, Python!',
            'Functions and conditional statements',
            'Loops and strings',
            'Data structures in Python'
          ]
        },
        { 
          id: '8', 
          text: 'Course 8: Google Data Analytics Capstone: Complete a Case Study', 
          completed: false,
          details: [
            'Identify the key features and attributes of a completed case study.',
            'Apply the practices and procedures associated with the data analysis process to a given set of data.',
            'Discuss the use of case studies/portfolios when communicating with recruiters and potential employers.',
            'Gain a competitive edge by learning AI skills from Google experts.'
          ],
          modules: [
            'Learn about capstone basics',
            'Optional: Build your portfolio',
            'Optional: Use your portfolio',
            'Put your certificate to work'
          ]
        },
        { 
          id: '9', 
          text: 'Course 9: Accelerate Your Job Search with AI', 
          completed: false,
          details: [
            'Uncover your skills and explore new career possibilities, with support from tools like Career Dreamer.',
            'Keep your applications organized with Google Sheets.',
            'Build a stand out resume and a step-by-step job search plan—with help from Gemini.',
            'Prepare for interviews and practice responding to questions using NotebookLM and Gemini Live.'
          ],
          modules: [
            'Uncover Your Transferable Skills with AI',
            'Plan Your Job Search with AI',
            'Manage Your Job Applications with AI',
            'Prepare and Practice for Interviews with AI'
          ]
        }
      ];
    }
    
    // Convert string modules to objects
    return initialTodos.map(todo => ({
      ...todo,
      modules: todo.modules ? todo.modules.map(m => typeof m === 'string' ? { text: m, completed: false } : m) : null
    }));
  });

  const [filter, setFilter] = useState("all"); // 'all', 'active', 'completed'

  useEffect(() => {
    localStorage.setItem('data-analytics-modules-todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    const newTodo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      details: null,
      modules: null
    };
    setTodos([newTodo, ...todos]);
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          const completed = !todo.completed;
          // Auto complete/uncomplete modules if toggling parent
          const newModules = todo.modules ? todo.modules.map(m => ({ ...m, completed })) : null;
          return { ...todo, completed, modules: newModules };
        }
        return todo;
      })
    );
  };

  const toggleModule = (todoId, moduleIndex) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === todoId && todo.modules) {
          const newModules = [...todo.modules];
          newModules[moduleIndex] = {
            ...newModules[moduleIndex],
            completed: !newModules[moduleIndex].completed
          };

          // Auto parent complete check
          const allCompleted = newModules.every(m => m.completed);
          return { ...todo, modules: newModules, completed: allCompleted };
        }
        return todo;
      })
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <div className="app-container">
      <header className="header" style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.8rem' }}>Google Data Analytics</h1>
        <p>Track your certificate progress.</p>
      </header>

      <TodoInput onAdd={addTodo} />

      <div className="filter-tabs">
        <button
          className={`filter-tab ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`filter-tab ${filter === "active" ? "active" : ""}`}
          onClick={() => setFilter("active")}
        >
          Active
        </button>
        <button
          className={`filter-tab ${filter === "completed" ? "active" : ""}`}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>

      <TodoList
        todos={filteredTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onToggleModule={toggleModule}
      />
    </div>
  );
}

export default App;
