const levenshteinDistance = (a, b) => {
    const n = a.length;
    const m = b.length;

    // Creamos una matriz de dimensiones (n+1) x (m+1)
    const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));

    // Inicializamos la primera fila y columna
    for (let i = 0; i <= n; i++) {
        dp[i][0] = i;
    }
    for (let j = 0; j <= m; j++) {
        dp[0][j] = j;
    }

    // Rellenamos la matriz
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            if (a[i - 1] === b[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = Math.min(
                    dp[i - 1][j] + 1,      // eliminación
                    dp[i][j - 1] + 1,      // inserción
                    dp[i - 1][j - 1] + 1   // sustitución
                );
            }
        }
    }
    return dp[n][m];
};

export const calculateAcurracyTranscript = (rawText, originalPhrase) => {
    const recognizedClean = cleanText(rawText);
    const originalClean = cleanText(originalPhrase);

    const originalWords = originalClean.split(" ");
    const recognizedWords = recognizedClean.split(" ");

    const distance = levenshteinDistance(originalWords, recognizedWords);

    // Calculamos la precisión: se asume que la precisión es 1 - (errores / total de palabras originales)
    const accuracy = Math.max(0, Math.round((1 - distance / originalWords.length) * 100));
    return accuracy;

}

export const cleanText = (text) => {
    const contractions = {
        "he's": "he is",
        "she's": "she is",
        "it's": "it is",
        "they're": "they are",
        "I'm": "I am",
        "you're": "you are",
        "we're": "we are",
        // Agrega más contracciones si es necesario
    };

    // Reemplaza las contracciones por su forma completa
    Object.keys(contractions).forEach(contraction => {
        const regex = new RegExp(`\\b${contraction}\\b`, 'gi');  // Buscar palabra exacta
        text = text.replace(regex, contractions[contraction]);
    });

    return text.toLowerCase().replace(/[.,!?;:]/g, "").trim(); // Normaliza el texto
};