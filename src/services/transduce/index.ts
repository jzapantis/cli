const sampleArray = [
    {
        record: {
            values: {
                prop1: "val1",
                prop2: "val2",
                number1: 1,
                number2: 2
            }
        }
    },
    {
        record: {
            values: {
                prop3: "val3",
                prop4: "val4",
                number3: 3,
                number4: 4
            }
        }
    }
]

export function transduce() {
    const mappedRecords = stevoMapper(sampleArray);
    return mappedRecords;
}

const stevoMapper = (arr: Array<any>) => {
    arr.reduce((collection, curRecord) => {
        return curRecord;
    }, [])
}