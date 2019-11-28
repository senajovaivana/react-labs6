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
            isEmailCorrect : undefined,
            isCompanyCorrect : undefined,
            isNameCorrect : undefined,
            isAgeCorrect : undefined,
            validationCompany : [],
            validationEmail : [],
            validationAge : [],
            validationName : []
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
                        errors={[...this.state.validationCompany, ...this.state.validationName,
                            ...this.state.validationEmail, ...this.state.validationAge]}
                        isReadyToSubmit={this.state.isEmailCorrect && this.state.isAgeCorrect &&
                        this.state.isNameCorrect && this.state.isCompanyCorrect}
                    />
                </div>
            </>
        );

    }

    handleChangeName = e => {
        let name = e.target.value;
        this.setState({name: name});
        let isCorrect = false;
        let errors = [];
        if (name !== null) {
            if (name.length < 3) {
                errors.push("Name should be at least 3 characters long.");
            } else {
                isCorrect = true;
            }
        }
        this.setState({validationName: errors, isNameCorrect: isCorrect});
    };

    handleChangeAge = e => {
        let age = e.target.value;
        let isCorrect = false;
        this.setState({age: age});
        let errors = [];
        if (age !== null) {
            if (age > 120) {
                errors.push("Age cannot be bigger than 120.");
            } else if (age < 0) {
                errors.push("Age cannot be negative number.");
            } else {
                isCorrect = true;
            }
        }
        this.setState({validationAge : errors, isAgeCorrect: isCorrect});
    };

    handleChangeCompany = e => {
        let name = e.target.value;
        this.setState({company: name});
        let isCorrect = false;
        let errors = [];
        if (name !== null) {
            if (name.length < 1) {
                errors.push("Name of company should be at least 1 character long.");
            } else {
                isCorrect = true;
            }
        }
        this.setState({validationCompany: errors, isCompanyCorrect: isCorrect});    };

    handleChangeEmail = e => {
        let email =  e.target.value;
        let isCorrect = false;
        this.setState({email: email});
        let errors = [];
        if (email != null) {
            if (email.length < 5) {
                errors.push("Email should be at least 5 characters long.");
            }
            if (email.split("").filter(x => x === "@").length !== 1) {
                errors.push("Email should contain a @.");
            }
            if (email.indexOf(".") === -1) {
                errors.push("Email should contain at least one dot.");
            }
            if (errors.length === 0)
                isCorrect = true;
        }
        this.setState({validationEmail : errors, isEmailCorrect: isCorrect});
    };

    handleChangeIsActive = e =>  {
        this.setState({isActive: e.target.value});
    };

    handleClickSubmit() {
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
            //redirect to page with list of employees
        }).then(data => this.props.history.push('/'))
       }
}

export default PageEmployee;