import React from 'react'
import NewEmployeeForm from "./NewEmployeeForm";

class EmployeePart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data : undefined,
            name : undefined,
            age : undefined,
            company : undefined,
            email: undefined,
            isActive : true,
            addEmployee : false,
            isSaving: false,
            deletingId : 0

        };
        this.handleClickCancel = this.handleClickCancel.bind(this);
        this.handleClickSubmit = this.handleClickSubmit.bind(this);
        this.handleAddEmployee = this.handleAddEmployee.bind(this);
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
                {this.state.data == null && <label> Loading ... </label> }
                <div>
                    <button onClick={this.handleAddEmployee}> Add new employee </button>
                </div>

                {this.state.addEmployee &&
                    <div style={style}>
                        <NewEmployeeForm
                            name={this.state.name}
                            onChangeName={this.handleChangeName}
                            age={this.state.age}
                            onChangeAge={this.handleChangeAge}
                            company={this.state.company}
                            onChangeCompany={this.handleChangeCompany}
                            email={this.state.email}
                            onChangeEmail={this.handleChangeEmail}
                            isActive={this.state.isActive}
                            onChangeIsActive={this.handleChangeIsActive}
                            onClickSubmit={this.handleClickSubmit}
                            onClickCancel={this.handleClickCancel}
                        />
                    </div>
                }
                {this.state.isSaving && <label> Is saving ... </label>}
                {this.state.data != null &&
                    <table style={style}>
                        <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Company</th>
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
                                     <td> {employee.isActive ? "true" : "false"} </td>
                                     <td onClick={() => this.handleDeleteEmployee(employee.id)}> x </td>
                                 </> }

                                 {employee.id === this.state.deletingId &&
                                 <>
                                     <td> Deleting row </td>
                                     <td> </td>
                                     <td> </td>
                                     <td> </td>
                                     <td> </td>
                                 </> }
                             </tr>)
                         }
                        </tbody>
                     </table>
                }
            </>
        );

    }

    handleChangeName = e => this.setState({name: e.target.value});
    handleChangeAge = e => this.setState({age: e.target.value});
    handleChangeCompany = e => this.setState({company: e.target.value});
    handleChangeEmail = e => this.setState({email: e.target.value});
    handleChangeIsActive = e => this.setState({isActive: e.target.value});

    handleClickCancel() {
        this.setState({addEmployee : false});
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

    handleAddEmployee() {
        this.setState({addEmployee : true});
    }


    handleClickSubmit() {
        this.setState({isSaving : true});

        //adding new employee with specified values
        return fetch('http://localhost:3004/employees', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                isActive: this.state.isActive,
                age: this.state.age,
                name: this.state.name,
                company: this.state.company,
                email: this.state.email
            }),
        }).then(data => this.setState({isSaving : false}))
            //reloading the data from server
            .then( data => fetch('http://localhost:3004/employees')
            .then(response => response.json())
            .then(data => this.setState({data : data , name : "", age : "", company : "", email: "", isActive : true})));
    }
}

export default EmployeePart;