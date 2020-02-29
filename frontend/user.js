
//GET api/users/<userID>

//Response for student
const user = {
    userID: 1,
    dormRoom: {
        dormRoomID: 123,
        vaskeliste: [
            {
                todoID: 1,
                task: 'Do something',
                isCompleted: false
            },
            {
                todoID: 2,
                task: 'Do nothing',
                isCompleted: false
            }
        ]
    },
    village: null
}


//Response for Manager
const user = {
    userID: 1,
    dormRoom: null,
    villages: [
        {
            villageID: 1234,
            dorms: [
                {
                    dormID: 123,
                    numberOfResidents: 10,
                    floor: 1,
                    building: 'A'
                },
                {
                    dormID: 334,
                    numberOfResidents: 5,
                    floor: 4,
                    building: 'B'
                },
            ]

        },
        {
            villageID: 546456,
            dorms: [
                {
                    dormID: 12234653,
                    numberOfResidents: 4,
                    floor: 1,
                    building: 'A'
                },
                {
                    dormID: 43654,
                    numberOfResidents: 5,
                    floor: 4,
                    building: 'B'
                },
            ]

        }
    ]
}

//GET api/completeTodo//<dormRoomID + todoID>: toggle isCompleted for dormRoomID + todoID

const washinglist = {
    dormRoom: {
        dormRoomID: 123,
        vaskeliste: [
            {
                todoID: 1,
                task: 'Do something',
                isCompleted: true //this changed to true if dormRoomID + todoID = 123 + 1
            },
            {
                todoID: 2,
                task: 'Do nothing',
                isCompleted: false
            }
        ]
    },
}

//GET api/washingList/<dormID>

const washinglist = {
    dormRoom: {
        dormRoomID: 123,
        vaskeliste: [
            {
                todoID: 1,
                task: 'Do something',
                isCompleted: true 
            },
            {
                todoID: 2,
                task: 'Do nothing',
                isCompleted: false
            }
        ]
    },
}

//POST api/addTaks/<dormID>
const data = {
        task: 'New Task',
    }

const washinglist = {
    dormRoom: {
        dormRoomID: 123,
        vaskeliste: [
            {
                todoID: 1,
                task: 'Do something',
                isCompleted: false
            },
            {
                todoID: 2,
                task: 'Do nothing',
                isCompleted: false
            },
            {
                todoID: 3,
                task: 'New Task',
                isCompleted: false
            }
        ]
    },
}