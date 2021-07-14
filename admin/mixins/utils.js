export default {
    methods: {
        monthLabelsAreaChartGenerate,
        courseNameLabelsPieChartGenerate,
        courseNameDataPieChartGenerate
    }
};

function courseNameDataPieChartGenerate(listCourse, revenue) {
    const result = []
    const element1 = listCourse[0] && Math.floor((listCourse[0].value/revenue)*100)
    const element2 = listCourse[1] && Math.floor((listCourse[1].value/revenue)*100)
    const element3 = listCourse[2] && Math.floor((listCourse[2].value/revenue)*100)
    if(listCourse.length >= 4) {
        result.push(element1)
        result.push(element2)
        result.push(element3)
        result.push(100 - (element1 + element2 + element3))
    } else {
        if(listCourse.length == 1) {
            result.push(100)
        } else if(listCourse.length == 2) {
            result.push(element1)
            result.push(100 - element1)
        } else {
            result.push(element1)
            result.push(element2)
            result.push(100 - (element1 + element2))
        }
    }
    return result
}

function courseNameLabelsPieChartGenerate(listCourse) {
    const result = []
    if(listCourse.length >= 4) {
        result.push(listCourse[0].name)
        result.push(listCourse[1].name)
        result.push(listCourse[2].name)
        result.push("Others")
    } else {
        listCourse[0] && result.push(listCourse[0].name)
        listCourse[1] && result.push(listCourse[1].name)
        listCourse[2] && result.push(listCourse[2].name)
    }
    return result
}

function monthLabelsAreaChartGenerate() {
    let result = []
    const curMonth = new Date().getMonth()
    const curYear = new Date().getFullYear()

    let month = curMonth
    let year = curYear

    let loop = 6
    let index = month
    while(loop > 0) {
        if(index < 0) {
            index = 11
            year -= 1
        }
        switch(index) {
            case 0: {
                result.push(`January (${year})`)
                break
            }
            case 1: {
                result.push(`February (${year})`)
                break
            }
            case 2: {
                result.push(`March (${year})`)
                break
            }
            case 3: {
                result.push(`April (${year})`)
                break
            }
            case 4: {
                result.push(`May (${year})`)
                break
            }
            case 5: {
                result.push(`June (${year})`)
                break
            }
            case 6: {
                result.push(`July (${year})`)
                break
            }    
            case 7: {
                result.push(`August (${year})`)
                break
            }  
            case 8: {
                result.push(`September (${year})`)
                break
            }  
            case 9: {
                result.push(`October (${year})`)
                break
            }  
            case 10: {
                result.push(`November (${year})`)
                break
            } 
            case 11: {
                result.push(`December (${year})`)
                break
            } 
            default: break
        }
        index -= 1
        loop -= 1
    }
    return result.reverse()
}