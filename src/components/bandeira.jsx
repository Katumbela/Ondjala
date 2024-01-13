import { useState, useEffect } from 'react';
import axios from 'axios';

const Bandeira = ({ countryCode, altura }) => {
  const [countryFlagUrl, setCountryFlagUrl] = useState(null);

  useEffect(() => {
    const fetchCountryFlag = async (iso) => {
      try {
        const response = await axios.get(
          `https://restcountries.com/v3.1/alpha/${iso}`
        );
        const countryData = response.data[0];
        const countryFlagUrl = countryData.flags.png;
        return countryFlagUrl;
      } catch (error) {
        console.error('Erro ao obter a bandeira do país:', error);
      }
    };

    fetchCountryFlag(countryCode)
      .then((flagUrl) => {
        setCountryFlagUrl(flagUrl);
      });
  }, [countryCode]);

  return (
    <div>
      {countryFlagUrl && (
        <img src={countryFlagUrl} height={altura} alt="Bandeira do país" />
      )}
    </div>
  );
};

export default Bandeira;
