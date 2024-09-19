export default async function Traduzir(textArray, authKey) {
    const url = "https://api.deepl.com/v2/translate";
    
    const headers = {
      "Authorization": `DeepL-Auth-Key ${authKey}`,
      "User-Agent": "YourApp/1.2.3",
      "Content-Type": "application/json",
    };
    
    const body = JSON.stringify({
      text: textArray, // Aqui você pode passar um array de textos
      target_lang: "PT-BR"
    });
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: body
      });
    
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.statusText}`);
      }
  
      const data = await response.json();
      return data.translations.map(t => t.text); // Retorna um array com as traduções
    } catch (error) {
      console.error('Erro ao consumir a API de tradução:', error);
      throw error;
    }
  }