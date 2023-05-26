import { useState } from "react";
import "./App.css";


function CalcButton({changeText,text, val}) {
  
  return (
    <div className="calc-button" onClick={() => {changeText(text+val)}}>
      {val}
    </div>
  )
}

function Calculator({dMode}) {
  const [text, setText] = useState("");

  function hChange(e) {
    setText(e.target.value);
  }

  function toCalc() {
    setAns(evaluate(toPrefix(text)));
  }

  const [ans, setAns] = useState('');

  return (
      <div className="calc">
        <h2 className={dMode ? "head-dark" : "head"}>Calculator</h2>
        <div className="upper">
        <textarea rows={4} cols={18} value={text} onChange={hChange} className="calc-display"></textarea>
        </div>
        <div className="lower">
        <div className="row">
          <CalcButton changeText={setText} text={text} val={'7'}/>
          <CalcButton changeText={setText} text={text} val={'8'}/>
          <CalcButton changeText={setText} text={text} val={'9'}/>
          <div className="calc-button" onClick={() => {setText("")}}>C</div>
        </div>

        <div className="row">
        <CalcButton changeText={setText} text={text} val={'4'}/>
        <CalcButton changeText={setText} text={text} val={'5'}/>
        <CalcButton changeText={setText} text={text} val={'6'}/>
        <CalcButton changeText={setText} text={text} val={'*'}/>
        </div>

        <div className="row">
        <CalcButton changeText={setText} text={text} val={'1'}/>
        <CalcButton changeText={setText} text={text} val={'2'}/>
        <CalcButton changeText={setText} text={text} val={'3'}/>
        <CalcButton changeText={setText} text={text} val={'-'}/>
        </div>
        
        <div className="row">
        <CalcButton changeText={setText} text={text} val={'0'}/>
        <CalcButton changeText={setText} text={text} val={'/'}/>
        <CalcButton changeText={setText} text={text} val={'+'}/>
        <CalcButton changeText={setText} text={text} val={'^'}/>
        </div>

        <div className="row">
        <CalcButton changeText={setText} text={text} val={'('}/>
        <CalcButton changeText={setText} text={text} val={')'}/>
        <div className="calc-button" onClick={() => {setText(evaluate(toPrefix(text)))}}>=</div>
        <div className="empty-button"></div>
        </div>
        </div>
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