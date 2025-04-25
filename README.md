
# Form Builder App

## Table of Contents

- [Installation](#installation)
- [Features](#features)
- [Technologies Used](#technologies-used)

## Installation

1. **Clone the repository:**
   ```bash
   git clone git@github.com:rakeshSpirehubs/form-builder.git
   ```

2. **Install dependencies:**
   ```bash
   cd form-builder
   npm install
   ```

3. **Run the project locally:**
   ```bash
   npm run dev
   ```

4. Open the browser and go to `http://localhost:5173`.

---

## Features

This project implements a **Form Builder** application with the following features:

### 1. **Drag-and-Drop Form Creation:**
   - You can **create a form** by selecting and dragging form fields onto the canvas.
   - **Form fields** include input fields, checkboxes, radio buttons, and dropdowns.

### 2. **Field Customization:**
   - After dragging a form field, you can **customize** the field:
     - Set a **title** and **placeholder** for the field.
     - Mark the field as **required**.
     - For fields like checkboxes or dropdowns, you can set **multiple selection options**.

### 3. **Saving Forms:**
   - Once the form is built and customized, you can **save** the form.
   - All previously created forms will be saved in the **form list**.

### 4. **Viewing and Filling Forms:**
   - From the saved list, you can **view any form** you have created.
   - The form will be displayed with its respective fields and **validation** based on your settings (e.g., required fields).

### 5. **Form Submission and Preview:**
   - Once the form is filled, you can **submit** the form.
   - After submission, you will see a **preview** of the submitted data.
   - If necessary, the form will **call an API** for submitting the data to a server or database.

---

## Technologies Used

- **React** - Frontend framework
- **Vite** - Build tool and development server
- **Shadcn** - Used for component library
- **Version** - Node: 22.0.0, React: 19.0.0, Typescript: 5.7.2

---