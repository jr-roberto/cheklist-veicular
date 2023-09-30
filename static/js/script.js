document.body.style.height = `${window.innerHeight}px`

const imgUser = []

const cheklist = [
    { id: 1, pergunta: "1. O motor está funcionando corretamente?", resposta: "", observacao: "" },
    { id: 2, pergunta: "2. Os freios estão em bom estado?", resposta: "", observacao: "" },
    { id: 3, pergunta: "3. Os pneus estão em boas condições? Verificar pressão e desgaste.", resposta: "", observacao: "" },
    { id: 4, pergunta: "4. Os faróis, lanternas e luzes de freio estão funcionando?", resposta: "", observacao: "" },
    { id: 5, pergunta: "5. O sistema de suspensão está em ordem?", resposta: "", observacao: "" },
    { id: 6, pergunta: "6. Verificar nível de óleo do motor e fluido de transmissão.", resposta: "", observacao: "" },
    { id: 7, pergunta: "7. Os espelhos retrovisores estão ajustados e em bom estado?", resposta: "", observacao: "" },
    { id: 8, pergunta: "8. O sistema de ar condicionado/ventilação funciona corretamente?", resposta: "", observacao: "" },
    { id: 9, pergunta: "9. Verificar se todos os cintos de segurança estão em bom estado.", resposta: "", observacao: "" },
    { id: 10, pergunta: "10. Os documentos do veículo estão em dia (licenciamento, seguro, etc.)?", resposta: "", observacao: "" }
]

const respostas = [
    { id: 1, descricao: "Bom", icon: "/img/bom.svg" },
    { id: 2, descricao: "Ruim", icon: "/img/ruim.svg" },
    { id: 3, descricao: "Nao se aplica", icon: "/img/naoaplica.svg" },
]

function iniciarChekList(element) {
    const title = document.querySelector("h1.cheklist-title");
    const msg = document.querySelector("p.cheklist-msg");

    cheklist.forEach((pergunta, index) => {
        const htmlPerunta = document.createElement("div");
        htmlPerunta.className = "cheklist-pergunta";

        const htmlPerguntaPer = document.createElement("p");
        htmlPerguntaPer.className = "cheklist-pergunta-per";
        htmlPerguntaPer.innerText = pergunta.pergunta;

        const htmlImgFoto = document.createElement("img");
        htmlImgFoto.className = "cheklist-pergunta-foto";
        htmlImgFoto.src = `../static/img/foto.svg`;
        htmlImgFoto.alt = `foto`;
        htmlImgFoto.id = `idpergunta-${pergunta.id}`;

        const htmlPerguntaRes = document.createElement("div");
        htmlPerguntaRes.className = "cheklist-pergunta-res";

        gerarResposta(htmlPerguntaRes, pergunta, index);

        htmlPerunta.appendChild(htmlPerguntaPer);
        htmlPerunta.appendChild(htmlImgFoto);
        htmlPerunta.appendChild(htmlPerguntaRes);

        element.parentElement.appendChild(htmlPerunta);
    });

    title.innerText = "Responda o cheklist";
    msg.remove();
    element.remove();
};

function gerarResposta(element, pergunta, index_pergunta) {

    respostas.forEach((res, index) => {
        const object_resposta = { id_pergunta: pergunta.id, id_resposta: res.id }

        const htmlLabel = document.createElement("label");
        htmlLabel.className = "cheklist-resposta";
        htmlLabel.setAttribute("for", JSON.stringify(object_resposta));

        const htmlLabelImg = document.createElement("img");
        htmlLabelImg.src = `../static${res.icon}`;
        htmlLabelImg.alt = res.descricao;
        htmlLabelImg.setAttribute("onclick", "respondendoPer(this)");
        htmlLabelImg.setAttribute("desc", res.descricao.toLowerCase().replace(/\s/g, ''));
        htmlLabelImg.setAttribute("index-pergunta", index_pergunta);
        htmlLabelImg.setAttribute("index-resposta", index);

        const htmlLabelInput = document.createElement("input");
        htmlLabelInput.type = "radio";
        htmlLabelInput.name = object_resposta.id_pergunta;
        htmlLabelInput.id = JSON.stringify(object_resposta);
        htmlLabelInput.value = object_resposta.id_resposta;
        htmlLabelInput.hidden = true;

        htmlLabel.appendChild(htmlLabelImg);
        element.appendChild(htmlLabelInput);
        element.appendChild(htmlLabel);
    });

    const htmlLabelObs = document.createElement("label");
    htmlLabelObs.className = "cheklist-resposta";

    const htmlLabelImg = document.createElement("img");
    htmlLabelImg.src = `../static/img/obs.svg`;
    htmlLabelImg.alt = `observacao`;
    htmlLabelImg.setAttribute("onclick", `adicionarDetalhes(${index_pergunta})`);

    htmlLabelObs.appendChild(htmlLabelImg);
    element.appendChild(htmlLabelObs);
};

function respondendoPer(element) {
    const desc = element.getAttribute("desc");
    const index_pergunta = element.getAttribute("index-pergunta");
    const index_resposta = element.getAttribute("index-resposta");

    cheklist[Number(index_pergunta)].resposta = respostas[Number(index_resposta)].descricao;

    const selects = element.parentElement.parentElement.querySelectorAll("label");

    selects.forEach((el) => { el.className = "cheklist-resposta" });

    element.parentElement.classList.add("select");
    element.parentElement.classList.add(desc);
}

function adicionarDetalhes(index_pergunta) {
    const per = cheklist[Number(index_pergunta)];

    if (per.resposta === "") {

        const msg = `\n\nPrimeiro selecione uma resposta a pergunta\n${per.pergunta}\nClicando em um dos icones [ V ] [ X ] [ - ].`

        return prompt(msg);
    }

    const popup = document.createElement("div");
    popup.className = "tela-popup";

    document.body.querySelector("div.cheklist").classList.add("focus-off");

    const htmlDetalhes = document.createElement("div");
    htmlDetalhes.className = "detalhes-per";

    const htmlPergunta = document.createElement("p");
    htmlPergunta.innerHTML = `<strong>Pergunta</strong><br>${per.pergunta}`;

    const htmlResposta = document.createElement("p");
    htmlResposta.innerHTML = `<strong>Resposta</strong><br>${per.resposta}`;

    const htmlObservacao = document.createElement("p");
    htmlObservacao.innerHTML = `<strong>Observacao</strong>`;

    const htmlTextObservacao = document.createElement("textarea");
    htmlTextObservacao.className = "textarea-detalhes-per";
    htmlTextObservacao.placeholder = "Escreva observacao aqui";
    htmlTextObservacao.value = `${per.observacao}`;
    htmlTextObservacao.addEventListener("focusout", () => { atualizaObservacao(htmlTextObservacao.value, index_pergunta) });
    htmlTextObservacao.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault(); // Impede o comportamento padrão da tecla "Enter"
        }
    });

    const htmlBtnConfirmar = document.createElement("button");
    htmlBtnConfirmar.innerText = "confirmar";
    htmlBtnConfirmar.className = "detalhes-per-btn";
    htmlBtnConfirmar.setAttribute("onclick", "closePopUp(this)");

    const htmlRegistroFoto = document.createElement("p");
    htmlRegistroFoto.innerHTML = `<strong>Registrar Foto</strong>`;

    const htmlLabelImg = document.createElement("img");

    if (per.img){

        const reader = new FileReader();

        reader.onload = function(e){ 
            htmlLabelImg.src = e.target.result;
        }
        
        reader.readAsDataURL(per.img);
        
    } else {
        htmlLabelImg.src = `../static/img/camera.svg`;
    }

    htmlLabelImg.alt = `foto-pergunta`;
    htmlLabelImg.className = "detalhes-per-img";
    htmlLabelImg.id = `idpergunta-${per.id}`;
    htmlLabelImg.setAttribute(`onclick`,`capturarFoto('${htmlLabelImg.id}',${index_pergunta})`);

    htmlDetalhes.appendChild(htmlPergunta);
    htmlDetalhes.appendChild(htmlResposta);
    htmlDetalhes.appendChild(htmlObservacao);
    htmlDetalhes.appendChild(htmlTextObservacao);
    htmlDetalhes.appendChild(htmlRegistroFoto);
    htmlDetalhes.appendChild(htmlLabelImg);
    htmlDetalhes.appendChild(htmlBtnConfirmar);

    popup.appendChild(htmlDetalhes);

    document.body.querySelector("div.app").appendChild(popup);
};

function closePopUp(element) {
    element.parentElement.parentElement.remove();
    document.body.querySelector("div.cheklist").classList.remove("focus-off");
}

function atualizaObservacao(observacao, index_pergunta) {
    cheklist[Number(index_pergunta)].observacao = observacao;
    console.log(`${observacao}-${index_pergunta}`)
}

function selecionarArquivo(index_pergunta) {
    return new Promise((resolve, reject) => {
        const fileInput = document.createElement("input");
        fileInput.accept = "image/*";
        fileInput.type = "file";

        fileInput.addEventListener("change", (event) => {
            const selectedFile = event.target.files[0];

            if (selectedFile) {
                imgUser.push(selectedFile);
                cheklist[Number(index_pergunta)].img = selectedFile;
                resolve(selectedFile);
            } else {
                reject("Nenhum arquivo selecionado");
            }
        });

        fileInput.click();
    });
}

async function capturarFoto(seletorimg,index_pergunta) {
    try {
        const arquivoSelecionado = await selecionarArquivo(index_pergunta);

        const imgView = document.querySelectorAll(`img#${seletorimg}`);

        const reader = new FileReader();

        reader.onload = function (e) {
            imgView.forEach((el)=>{
                el.src = e.target.result;
            });
        };

        reader.readAsDataURL(arquivoSelecionado);
        // Faça o que você precisa fazer com o arquivo aqui
    } catch (error) {
        console.error("Erro ao selecionar arquivo:", error);
    }

    let files = [];

    imgUser.forEach((img,index)=>{
        
        if (files.includes(img.name)){
            imgUser.splice(index,1);
        }

        files.push(img.name);
    });
}
