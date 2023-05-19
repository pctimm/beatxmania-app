# Saturday Night Vibin' 🎸#
É um jogo de rítmo; 🎵

Clone simples no estilo Beatmania/Guitar Hero com uma música de demonstração já pré-instalada (Saria's Song, do The Legend of Zelda).

### Como instalar? ###
1. Baixando
	a. pode-se realizar o _clone_ deste repositório: `git clone ...`
	b. baixar o arquivo .zip do repositório, extraindo utilizando programa como o 7-Zip, WinRAR ou similar.
2. Abrir o arquivo .html no navegador de sua preferência.

### Como jogar? ###
Para iniciar o jogo, basta clicar em qualquer lugar da janela.

Após isso, posicionar os dedos da mão esquerda nas teclas S, D e F (sentindo o relevo na tecla F com dedo indicador) e os da mão esquerda nas teclas J, K e L (com o relevo com o indicador na tecla J). Ou seja, 6 notas.

A contagem de regressiva de três segundos irá tocar, após isso as notas aparecerão de baixo para cima.

Para reiniciar, recarregar a página com F5.

#### Mais info ####
O contador de "Ticks" representa na verdade a quantidade de quadros renderizados pelo loop do jogo, que estará executando a 60 FPS.

Dois elementos de dificuldade do jogo podem ser alterados: velocidade das notas e margem de erro para contar como acerto. Para isso, verificar os "ticks para 50vh" e margemErroVh, dentro do arquivo `gamecycle.js`.

***

⚡ Desenvolvido por Patrick Timm utilizando HTML, CSS e JS. 🖥️

