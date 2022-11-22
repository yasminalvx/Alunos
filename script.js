let alunos = [];

function createAluno() {
  const nome = document.getElementById("nome").value;
  const matricula = document.getElementById("matricula").value;
  const nota1 = parseFloat(document.getElementById("nota1").value);
  const nota2 = parseFloat(document.getElementById("nota2").value);
  const nota3 = parseFloat(document.getElementById("nota3").value);

  const aluno = new Aluno(nome, matricula, nota1, nota2, nota3);

  if (validateForm()) {
    alunos.push(aluno);
    updateTable();
  }
}

function validateForm() {
  const nome = document.getElementById("nome").value;
  const matricula = document.getElementById("matricula").value;
  const nota1 = parseFloat(document.getElementById("nota1").value);
  const nota2 = parseFloat(document.getElementById("nota2").value);
  const nota3 = parseFloat(document.getElementById("nota3").value);

  if (!nome || !matricula || isNaN(nota1) || isNaN(nota2) || isNaN(nota3)) {
    alert("Formulário inválido");
    return false;
  }

  if (matricula && alunos.find((x) => x.matricula == matricula)) {
    alert("Já existe um aluno com essa matrícula");
    return false;
  }

  return true;
}

function onKeyUpNota(name) {
  const notaInput = document.getElementById(name);
  const nota = parseFloat(notaInput.value);
  if (!isNaN(nota)) {
    if (nota > 10) {
      notaInput.value = "10";
    } else if (nota <= 0) {
      notaInput.value = "0";
    }
  }
}

function deleteAluno(matricula) {
  let tbodyDiv = document.getElementById("tbody");

  const index = alunos.findIndex((x) => x.matricula == matricula);
  alunos.splice(index, 1);

  tbodyDiv.deleteRow(index);
}

function updateTable() {
  let tbodyDiv = document.getElementById("tbody");
  tbodyDiv.innerHTML = "";

  for (let aluno of alunos) {
    let tr = tbodyDiv.insertRow();

    let td_nome = tr.insertCell();
    let td_matricula = tr.insertCell();
    let td_nota1 = tr.insertCell();
    let td_nota2 = tr.insertCell();
    let td_nota3 = tr.insertCell();
    let td_media = tr.insertCell();
    let td_acoes = tr.insertCell();

    td_nome.innerText = aluno.nome;
    td_matricula.innerText = aluno.matricula;
    td_nota1.innerText = aluno.nota1;
    td_nota2.innerText = aluno.nota2;
    td_nota3.innerText = aluno.nota3;
    td_media.innerText = aluno.calculaMedia();

    const imgDelete = document.createElement("img");
    imgDelete.src = "img/trash-fill.svg";
    imgDelete.setAttribute("onclick", `deleteAluno(${aluno.matricula})`);
    td_acoes.appendChild(imgDelete);
  }
}

class Aluno {
  nome;
  matricula;
  nota1;
  nota2;
  nota3;

  constructor(nome, matricula, n1, n2, n3) {
    this.nome = nome;
    this.matricula = matricula;
    this.nota1 = n1;
    this.nota2 = n2;
    this.nota3 = n3;
  }

  exibeInfo() {
    return `Aluno: ${this.nome} - mat: ${this.matricula}
         Notas: N1: ${this.nota1} - N2: ${this.nota2} - N3: ${this.nota3}
         Média:${this.calculaMedia()}`;
  }

  calculaMedia() {
    return ((this.nota1 + this.nota2 + this.nota3) / 3).toFixed(2);
  }
}
