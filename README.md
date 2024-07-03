# SinCity Media

SinCity Media is a web application designed to showcase and manage creative templates for various digital projects. Users can explore, search, and view details of templates, as well as other designers contributing their own creations.

### Designers

- **Zeth Thomas**

## Features

- **Search Templates**: Search for templates by category or keyword.
- **View Details**: See detailed information about each template, including previews and designer information.
- **User Authentication**: Secure login and registration system using JWT authentication.
- **Designer Contributions**: Logged-in users can contribute templates and manage their submissions.
- **Responsive Design**: Mobile-friendly interface for seamless user experience across devices.

## Technologies Used

- **Frontend**: React.js, React Router DOM
- **Backend**: Node.js, Express.js, PostgreSQL
- **Authentication**: JSON Web Tokens (JWT)
- **API Integration**: Envato API for fetching template data
- **Styling**: CSS, Bootstrap for layout and responsiveness

## Getting Started

- Node.js and npm installed on your machine
- PostgreSQL database setup 

### Authentication and Profile Routes

- **POST `/auth/login`**
  - *Description:* Authenticate user and generate JWT token.
  - *Body:* `{ email, password }`
  - *Response:* `{ user, token }`

- **GET `/auth/profile`**
  - *Description:* Fetch user profile information.
  - *Headers:* `Authorization: Bearer <token>`
  - *Response:* `{ id, email, first_name, last_name }`

- **POST `/auth/signup`**
  - *Description:* Register a new user.
  - *Body:* `{ first_name, last_name, email, password }`
  - *Response:* `{ user, token }`

### Template Comments Routes

- **POST `/templates/:id/comments`**
  - *Description:* Add a comment and rating to a template.
  - *Parameters:* `:id` (template id)
  - *Body:* `{ comment, rating }`
  - *Headers:* `Authorization: Bearer <token>`
  - *Response:* `{ comment_id, comment, rating, user_id, template_id }`

- **GET `/comments?templateId=<templateId>`**
  - *Description:* Fetch comments for a specific template.
  - *Query Parameters:* `templateId` (required)
  - *Response:* `[ { comment_id, comment, rating, user_id, template_id }, ... ]`

## Future Goals

Continue to develop this app by:
- Expanding designer portfolios
- Fixing bugs
- Detail Envato's templates
- Creating a favorites page


