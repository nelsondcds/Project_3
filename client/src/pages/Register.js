// // import React, { useContext, useState } from "react";
// // import { Button, Form } from "semantic-ui-react";
// // import { useMutation } from "@apollo/react-hooks";
// // import gql from "graphql-tag";

// // import { AuthContext } from "../context/auth";
// // import { useForm } from "../util/hooks";

// // function Register(props) {
// //   const context = useContext(AuthContext);
// //   const [errors, setErrors] = useState({});

// //   const { onChange, onSubmit, values } = useForm(registerUser, {
// //     username: "",
// //     email: "",
// //     password: "",
// //     confirmPassword: "",
// //   });

// //   const [addUser, { loading }] = useMutation(REGISTER_USER, {
// //     update(_, { data: { register: userData } }) {
// //       //console.log(userData);
// //       context.login(userData);
// //       props.history.push("/");
// //     },
// //     onError(err) {
// //       setErrors(err.graphQLErrors[0].extensions.exception.errors);
// //     },
// //     variables: values,
// //   });

// //   function registerUser() {
// //     addUser();
// //   }

// //   return (
// //     <div className="form-container">
// //       <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
// //         <h1>Register</h1>
// //         <Form.Input
// //           label="Username"
// //           placeholder="Username.."
// //           name="username"
// //           type="text"
// //           value={values.username}
// //           error={errors.username ? true : false}
// //           onChange={onChange}
// //         />
// //         <Form.Input
// //           label="Email"
// //           placeholder="Email.."
// //           name="email"
// //           type="email"
// //           value={values.email}
// //           error={errors.email ? true : false}
// //           onChange={onChange}
// //         />
// //         <Form.Input
// //           label="Password"
// //           placeholder="Password.."
// //           name="password"
// //           type="password"
// //           value={values.password}
// //           error={errors.password ? true : false}
// //           onChange={onChange}
// //         />
// //         <Form.Input
// //           label="Confirm Password"
// //           placeholder="Confirm Password.."
// //           name="confirmPassword"
// //           type="password"
// //           value={values.confirmPassword}
// //           error={errors.confirmPassword ? true : false}
// //           onChange={onChange}
// //         />
// //         <Button type="submit" primary>
// //           Register
// //         </Button>
// //       </Form>
// //       {Object.keys(errors).length > 0 && (
// //         <div className="ui error message">
// //           <ul className="list">
// //             {Object.values(errors).map((value) => (
// //               <li key={value}>{value}</li>
// //             ))}
// //           </ul>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // const REGISTER_USER = gql`
// //   mutation register(
// //     $username: String!
// //     $email: String!
// //     $password: String!
// //     $confirmPassword: String!
// //   ) {
// //     register(
// //       registerInput: {
// //         username: $username
// //         email: $email
// //         password: $password
// //         confirmPassword: $confirmPassword
// //       }
// //     ) {
// //       id
// //       email
// //       username
// //       createdAt
// //       token
// //     }
// //   }
// // `;

// // export default Register;

// import React, { useState } from "react";
// // import { Button, Form } from "semantic-ui-react";
// import { Form, Button, Alert } from "react-bootstrap";

// // import { createUser } from '../utils/API';
// import Auth from "../util/auth";

// import { ADD_USER } from "../util/mutation";
// import { useMutation } from "@apollo/react-hooks";

// const Register = () => {
//   // set initial form state
//   const [userFormData, setUserFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });
//   // set state for form validation
//   const [validated] = useState(false);
//   // set state for alert
//   const [showAlert, setShowAlert] = useState(false);
//   const [addUser, { error }] = useMutation(ADD_USER);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setUserFormData({ ...userFormData, [name]: value });
//   };

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();

//     // check if form has everything (as per react-bootstrap docs)
//     const form = event.currentTarget;
//     if (form.checkValidity() === false) {
//       event.preventDefault();
//       event.stopPropagation();
//     }

//     try {
//       const { data } = await addUser({
//         variables: {
//           ...userFormData,
//         },
//       });

//       if (error) {
//         throw new Error("something went wrong!");
//       }

//       // const { token, user } = await response.json();
//       // console.log(user);
//       Auth.login(data.addUser.token);
//     } catch (err) {
//       console.error(err);
//       setShowAlert(true);
//     }

//     setUserFormData({
//       username: "",
//       email: "",
//       password: "",
//     });
//   };

//   return (
//     <>
//       {/* This is needed for the validation functionality above */}
//       <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
//         {/* show alert if server response is bad */}
//         <Alert
//           dismissible
//           onClose={() => setShowAlert(false)}
//           show={showAlert}
//           variant="danger"
//         >
//           Something went wrong with your register!
//         </Alert>

//         <Form.Group>
//           <Form.Label htmlFor="username">Username</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Your username"
//             name="username"
//             onChange={handleInputChange}
//             value={userFormData.username}
//             required
//           />
//           <Form.Control.Feedback type="invalid">
//             Username is required!
//           </Form.Control.Feedback>
//         </Form.Group>

//         <Form.Group>
//           <Form.Label htmlFor="email">Email</Form.Label>
//           <Form.Control
//             type="email"
//             placeholder="Your email address"
//             name="email"
//             onChange={handleInputChange}
//             value={userFormData.email}
//             required
//           />
//           <Form.Control.Feedback type="invalid">
//             Email is required!
//           </Form.Control.Feedback>
//         </Form.Group>

//         <Form.Group>
//           <Form.Label htmlFor="password">Password</Form.Label>
//           <Form.Control
//             type="password"
//             placeholder="Your password"
//             name="password"
//             onChange={handleInputChange}
//             value={userFormData.password}
//             required
//           />
//           <Form.Control.Feedback type="invalid">
//             Password is required!
//           </Form.Control.Feedback>
//         </Form.Group>
//         <Button
//           disabled={
//             !(
//               userFormData.username &&
//               userFormData.email &&
//               userFormData.password
//             )
//           }
//           type="submit"
//           variant="success"
//         >
//           Register
//         </Button>
//       </Form>
//     </>
//   );
// };

// export default Register;
