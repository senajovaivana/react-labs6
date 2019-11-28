import React from 'react'
import NewEmployee from "./NewEmployee";

class PageEmployee extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data : undefined,
            name : undefined,
            age : undefined,
            company : undefined,
            email: undefined,
            isActive : undefined,
            isSaving: false,
            deletingId : 0

        };
        this.handleClickSubmit = this.handleClickSubmit.bind(this);
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
                <h1> Add new employee </h1>
                <div style={style}>
                    <NewEmployee
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
                    />
                </div>
            </>
        );

    }

    handleChangeName = e => this.setState({name: e.target.value});
    handleChangeAge = e => this.setState({age: e.target.value});
    handleChangeCompany = e => this.setState({company: e.target.value});
    handleChangeEmail = e => this.setState({email: e.target.value});
    handleChangeIsActive = e => this.setState({isActive: e.target.value});



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

export default PageEmployee;