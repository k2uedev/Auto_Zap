document.getElementById('formEnvio').addEventListener('submit', function(event) {
  event.preventDefault();

  const numero = document.getElementById('numero').value;
  const mensagem = document.getElementById('mensagem').value;
  const repeticoes = document.querySelector('input[name="repeticoes"]:checked').value;
  const intervalo = document.querySelector('input[name="intervalo"]:checked').value * 60000;
  const adicionais = Array.from(document.querySelectorAll('input[name="adicional"]:checked')).map(el => el.value);

  const confirmarEnvio = adicionais.includes('confirmar');
  const notificarEnvio = adicionais.includes('notificar');
  const salvarHistorico = adicionais.includes('salvar');

  if (confirmarEnvio) {
      const confirmar = confirm(`Voce está prestes a enviar esta mensagem ${repeticoes} vezes com um intervalo de ${intervalo / 60000} minutos. Deseja continuar?`);
      if (!confirmar) return;
  }

  for (let i = 0; i < repeticoes; i++) {
      setTimeout(() => {
          window.open(`https://web.whatsapp.com/send?phone=${numero}&text=${encodeURIComponent(mensagem)}`, '_blank'); /*Aqui será tipo o caminho para  o whatsapp web*/
          if (notificarEnvio) {
              alert(`Mensagem ${i + 1} enviada com sucesso!`);
          }
          if (salvarHistorico) {
              localStorage.setItem(`mensagem_${i + 1}`, `Numero: ${numero}, Mensagem: ${mensagem}`);
          }
      }, i * intervalo);
  }
});
