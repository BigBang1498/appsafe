document.getElementById("consejo-btn").addEventListener("click", function() {
    let consejos = [
        "🚶 Evita caminar solo en lugares poco iluminados.",
        "🔑 No compartas información personal con desconocidos.",
        "📱 Activa la autenticación en dos pasos en tus cuentas.",
        "🚪 Verifica siempre quién llama antes de abrir la puerta.",
        "🛑 No uses redes Wi-Fi públicas para acceder a cuentas bancarias.",
        "🚨 Siempre avisa a alguien de confianza cuando tomes transporte público tarde."
    ];

    let consejoAleatorio = consejos[Math.floor(Math.random() * consejos.length)];
    document.getElementById("consejo").innerText = consejoAleatorio;
});
