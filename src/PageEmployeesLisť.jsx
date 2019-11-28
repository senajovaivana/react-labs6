import React from 'react'
import { Link } from "react-router-dom";
class EmployeePart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data : undefined,
            deletingId : 0
        };
        this.handleDeleteEmployee = this.handleDeleteEmployee.bind(this);
    }

    //fetching data of employees from server
    componentDidMount() {
        fetch('http://localhost:3004/employees')
            .then(response => response.json())
            .then(data => this.setState({data : data }));
    }

    render() {
        let style = {
            borderStyle: 'solid',
            borderWidth: 1,
            margin : 20,
            padding : 15
        };
        return (
            <>
                <h1>List of employees</h1>
                {this.state.data != null &&
                <table style={style}>
                    <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Company</th>
                        <th>Email</th>
                        <th>Is active</th>
                        <th>Delete</th>
                    </tr>

                    {this.state.data.map(employee =>
                        <tr key={employee.id} style={{ textAlign: "center" }}>
                            {employee.id !== this.state.deletingId &&
                            <>
                                <td> {employee.name} </td>
                                <td> {employee.age} </td>
                                <td> {employee.company} </td>
                                <td> {employee.email} </td>
                                <td> {employee.isActive ? "true" : "false"} </td>
                                <td onClick={() => this.handleDeleteEmployee(employee.id)}> x </td>
                            </> }
                            {employee.id === this.state.deletingId &&
                            <>
                                <td> Deleting row </td>
                            </> }
                        </tr>)
                    }
                    </tbody>
                </table>
                }
                <Link to="/new">Create new employee</Link>
            </>
        );

    }

    handleDeleteEmployee(id) {
        this.setState({deletingId : id});

        //deleting employee with specified id
        return fetch('http://localhost:3004/employees/' + id, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: id})
        }).then(data => this.setState({deletingId: 0}))
        //reloading data from server
            .then(data => fetch('http://localhost:3004/employees')
                .then(response => response.json())
                .then(data => this.setState({data: data})))
    }
}

export default EmployeePart;