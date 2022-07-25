function add(x, y)
{
    return x + y
}
function subtract(x, y)
{
    return x - y
}
function multiply(x, y)
{
    return x * y
}
function divide(x, y)
{
    if (y === 0)
    {
        throw new Error("Can't divide by zero")
    }
    return x / y
}

function clean()
{
    firstOperandString = ""
    secondOperandString = ""
    operation = undefined
    displayElement.innerText = ""
}

const Add = "+"
const Subtract = "-"
const Multiply = "*"
const Divide = "/"

// this is an object which maps operation constants and references to corresponding operation functions
const operations = {
    [Add]: add,
    [Subtract]: subtract,
    [Multiply]: multiply,
    [Divide]: divide
}

function operate(operator, x, y)
{
    const operationFunction = operations[operator]
    return operationFunction(x, y)
}

let firstOperandString = ""
let secondOperandString = ""
let operation = undefined

const displayElement = document.getElementById("display")

function equals()
{
    if (firstOperandString !== "" && operation !== undefined && secondOperandString !== "")
    {
        let result
        try
        {
            result = operate(operation, Number(firstOperandString), Number(secondOperandString))
        } catch (e)
        {
            alert(e)
            return
        }

        result = Math.round((result + Number.EPSILON) * 100000) / 100000
        displayElement.innerText = result
        firstOperandString = result.toString()
        secondOperandString = ""
        operation = undefined
    }
}

function setOperand(x)
{
    // still on first operand
    if (operation === undefined && firstOperandString.length < 10)
    {
        firstOperandString += x
        displayElement.innerText += x
    }
    else if (operation !== undefined && secondOperandString.length < 10)
    {
        // on second operand
        secondOperandString += x
        displayElement.innerText += x
    }
}

function setOperation(op)
{
    if (operation)
    {
        equals()
    }
    else
    {
        firstOperandString = displayElement.innerText
    }
    if (firstOperandString && operation === undefined)
    {
        operation = op
        displayElement.innerText += op
    }
}

function addDot()
{
    // we can add dot to second operand if we started writing it
    if (secondOperandString !== "" && !secondOperandString.includes("."))
    {
        secondOperandString += "."
        displayElement.innerText += "."
    }
    else if (firstOperandString !== "" && !firstOperandString.includes(".") && operation === undefined)
    {
        // we can add dot to first operand only if we started writing and if operation wasn't yet entered
        firstOperandString += "."
        displayElement.innerText += "."
    }
}

function back()
{
    if (secondOperandString !== "")
    {
        secondOperandString = secondOperandString.slice(0, -1)
        displayElement.innerText = displayElement.innerText.slice(0, -1)
    }
    else if (operation === undefined && firstOperandString !== "")
    {
        firstOperandString = firstOperandString.slice(0, -1)
        displayElement.innerText = displayElement.innerText.slice(0, -1)
    }
    else if (operation)
    {
        displayElement.innerText = displayElement.innerText.slice(0, -1)
        operation = undefined
    }
}

// add keyboard support
document.onkeydown = function (e)
{
    if (e && e.key)
    {
        if (e.which === 8)
        {
            back()
        }
        if (e.which === 46)
        {
            clean()
        }
        if (e.which === 110)
        {
            addDot()
        }
        if (e.which >= 48 && e.which <= 57 || e.which >= 96 && e.which <= 105)
        {
            setOperand(Number(e.key))
        }

        const operationFunction = operations[e.key]
        if (operationFunction)
        {
            setOperation(e.key)
        }
        if (e.which === 13)
        {
            equals()
        }
    }
}
