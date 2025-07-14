# Form Builder Application - Project Plan

## Overview
A full-stack form builder application that allows registered users to create dynamic, nested forms with multiple field types and validation options. Forms are shareable via URLs and responses are collected from unregistered users.

## Core Workflow

### 1. Form Creation & Management
- **User Registration Required**: Only registered users can create, edit, and save forms
- **JSON Configuration**: Forms are stored as JSON configuration in database
- **Form URLs**: Each form generates a unique shareable URL
- **Public Access**: Anyone with the URL can fill forms (no registration required)
- **Response Storage**: All form responses saved in MongoDB with corresponding form ID

### 2. User Dashboard
- View all created forms
- Create new forms
- Edit existing forms
- Delete forms
- View form responses and analytics
- Form management tools

### 3. Additional Features (Incremental)
- Archive forms
- Export form configuration as JSON
- Import JSON configuration to create new forms
- Form templates

## Form Structure & Architecture

### Hierarchical Form Structure
```
Form
├── Steps (max 6) - Stepper Navigation
    ├── Sections (max 6) - Accordion/Expansion Panels
        ├── Fields (max 10) - Input Components
```

### Field Types & Validation

#### 1. Text Field
- **Validation Options**:
  - `minlength`: Minimum character length
  - `maxlength`: Maximum character length  
  - `regex`: Regular expression pattern

#### 2. Number Field
- **Validation Options**:
  - `minValue`: Minimum numeric value
  - `maxValue`: Maximum numeric value

#### 3. Select Field (Radio)
- **Options**: Up to 4 choices
- **UI**: Radio button group
- **Single selection only**

#### 4. Multi-Select Field (Checkbox)
- **Options**: Up to 6 choices
- **UI**: Checkbox group
- **Multiple selections allowed**

#### 5. True/False Field (Switch)
- **UI**: Toggle switch component
- **Boolean value output**

#### 6. Range Field (Slider)
- **Range**: 1-100
- **UI**: Slider component
- **Numeric output**

### Base Field Schema
```javascript
BaseField {
  id: string,
  label: string,
  type: FieldType,
  required: boolean
}
```

---
