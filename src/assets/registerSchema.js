export default {
    groups: [
        {
            fields: [
                {
                    type: 'input',
                    inputType: 'text',
                    label: 'First Name',
                    model: 'name.fName'
                },
                {
                    type: 'input',
                    inputType: 'text',
                    label: 'Last Name',
                    model: 'name.lName'
                },
                {
                    type: 'input',
                    inputType: 'number',
                    label: 'Phone Number',
                    model: 'phoneNumber'
                },
                {
                    type: 'input',
                    inputType: 'email',
                    label: 'Email',
                    model: 'email'
                },
                
            ]
        }
    ]
}