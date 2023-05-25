import { useState } from "react";
import "./App.css";


function Calculator({dMode}) {
  const [text, setText] = useState("");

  function hChange(e) {
    setText(e.target.value);
  }

  function toCalc() {
    setAns(evaluate(toPrefix(text)));
  }

  const [ans, setAns] = useState('Type an expression without spaces');

  return (
    <div>
      <div className="calc">
        <h2 className={dMode ? "head-dark" : "head"}>Calculator</h2>
        <input type="text" value={text} onChange={hChange} />
        <h1 id="eq">=</h1>
        <p>{ans}</p>
      </div>

      <button className="calcBtn" onClick={toCalc}>Calculate</button>
    </div>
  );
}

export default Calculator;
function isOperand(operand) {
  if (
    (operand >= "a" && operand <= "z") ||
    (operand >= "A" && operand <= "Z") ||
    (operand >= "0" && operand <= "9") ||
    (!isNaN(operand))
  ) {
    return 1;
  } else {
    return 0;
  }
}
function toPrefix(infixed) {
  var buffer = "";
  var infix = [];
  for (var i = 0; i < infixed.length; i++) {
    var c = infixed.charAt(i);
    if (isOperand(c)) {
      buffer += c
    } else {
      infix.push(buffer);
      buffer = "";
      infix.push(c);
    }
  }
  infix.push(buffer);
  for (var i = 0; i < infix.length; i++) {
    if (infix[i] == "(") {
      infix[i] = ")";
    } else if (infix[i] == ")") {
      infix[i] = "(";
    }
  }
  infix = infix.reverse();
  var stack = [],
    prefix = [];
  var operand, prec;
  

  function precedence(prec) {
    if (prec == "(") {
      return 4;
    }
    if (prec == "^" || prec == "%") {
      return 3;
    }
    if (prec == "*" || prec == "/") {
      return 2;
    }
    if (prec == "+" || prec == "-") {
      return 1;
    }
    if (prec == ")") {
      return 0;
    }
    return -1;
  }


  for (var i = 0; i < infix.length; i++) {
    if (isOperand(infix[i])) {
      prefix.push(infix[i]);
    } else if (infix[i] == " ") {
      continue;
    } else if (stack.length == 0) {
      stack.push(infix[i]);
    } else if (infix[i] == ")") {
      while (stack[stack.length - 1] != "(") {
        prefix.push(stack.pop());
      }
      stack.pop();
    } else if (precedence(infix[i]) > precedence(stack[stack.length - 1])) {
      stack.push(infix[i]);
    } else {
      while (
        precedence(infix[i]) <= precedence(stack[stack.length - 1]) &&
        stack.length != 0 &&
        stack[stack.length - 1] != "("
      ) {
        prefix.push(stack.pop());
      }
      stack.push(infix[i]);
    }
  }
  while (stack.length != 0) {
    prefix.push(stack.pop());
  }
  infix[i] = " ";
  return prefix.reverse().filter(function(e) {return e.trim() != '';});

}

function evaluate(exp) {
  exp = exp.reverse();
  var stack = [];

  function operation(o,a,b) {

    a = parseInt(a);
    b = parseInt(b);
    if (o === "+") {
      return a + b;
    }
    if (o === "-") {
      return a-b;
    }
    if (o === "*") {
      return a*b;
    } 
    if (o === "/") {
      return a/b;
    }
    if (o === "^") {
      return a**b;
    }
  }
  
  for (var i = 0; i < exp.length; i++) {
    if (isOperand(exp[i])) {
      stack.push(exp[i]);
    } else {
      stack.push(operation(exp[i], stack.pop(), stack.pop()))
    }
  }

  return stack.pop();
}