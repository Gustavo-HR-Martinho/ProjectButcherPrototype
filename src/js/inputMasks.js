VMasker(document.querySelectorAll("input[type='text']")).maskMoney({
    // Decimal precision -> "90"
    precision: 2,
    // Decimal separator -> ",90"
    separator: ',',
    // Number delimiter -> "12.345.678"
    delimiter: '.',
    // Money unit -> "R$ 12.345.678,90"
    unit: 'R$',
    // Force type only number instead decimal,
    // masking decimals with ",00"
    // Zero cents -> "R$ 1.234.567.890,00"
    zeroCents: true
});

const revertMask = (value) => {
    return parseFloat(value.substring(3).replace(/\./g, '').replace(/\,/g, '.'));
}

function setCaretPosition() {
    // Modern browsers
    if (this.setSelectionRange) {
      this.focus();
      this.setSelectionRange(this.value.length, this.value.length);
    
    // IE8 and below
    } else if (this.createTextRange) {
      var range = this.createTextRange();
      range.collapse(true);
      range.moveEnd('character', this.value.length);
      range.moveStart('character', this.value.length);
      range.select();
    }
}

document.getElementById("faturamento").addEventListener("focus", setCaretPosition.bind(document.getElementById("faturamento")));
document.getElementById("faturamento").addEventListener("click", setCaretPosition.bind(document.getElementById("faturamento")));
document.getElementById("compras").addEventListener("focus", setCaretPosition.bind(document.getElementById("compras")));
document.getElementById("compras").addEventListener("click", setCaretPosition.bind(document.getElementById("compras")));
document.getElementById("custoFixo").addEventListener("focus", setCaretPosition.bind(document.getElementById("custoFixo")));
document.getElementById("custoFixo").addEventListener("click", setCaretPosition.bind(document.getElementById("custoFixo")));
document.getElementById("custoVariavel").addEventListener("focus", setCaretPosition.bind(document.getElementById("custoVariavel")));
document.getElementById("custoVariavel").addEventListener("click", setCaretPosition.bind(document.getElementById("custoVariavel")));