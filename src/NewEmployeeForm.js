import React from 'react'

const NewEmployeeForm  = ({
                                name,
                                age,
                                company,
                                email,
                                isActive,
                                onClickSubmit,
                                onClickCancel,
                                onChangeName,
                                onChangeAge,
                                onChangeCompany,
                                onChangeEmail,
                                onChangeIsActive
                            }) => {


    return (
        <div>
            <label> Name </label>
            <input type="text" value={name}  onChange={onChangeName} />

            <label> Age </label>
            <input type="number" value={age}  onChange={onChangeAge}/>

            <label> Company </label>
            <input type="text" value={company} onChange={onChangeCompany}/>

            <label> Email </label>
            <input type="text" value={email}  onChange={onChangeEmail}/>

            <label> Is active </label>
            <select value={isActive} onChange={onChangeIsActive}>
                <option value="false">False</option>
                <option value="true">True</option>
            </select>

            <div style={ {padding : 10}}>
                <button onClick={onClickSubmit}> Submit </button>
                <button onClick={onClickCancel}> Cancel</button>
            </div>
        </div>
    );


};

export default NewEmployeeForm;