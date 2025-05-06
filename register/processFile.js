function getSNPSFromString(text) {
    try {
      const jsonSnips = {
        'rs952718': "", 'rs7803075': "", 'rs9319336': "", 'rs2397060': "", 'rs1344870': "", 'rs2946788': "",
        'rs6591147': "", 'rs2272998': "", 'rs7229946': "", 'rs9951171': "", 'rs525869': "", 'rs530501': "",
        'rs2040962': "", 'rs2032624': "", 'rs1865680': "", 'rs17307398': "", 'rs3795366': "", 'rs2460111': "",
        'rs1675126': "", 'rs1061629': "", 'rs538847': "", 'rs76432344': "", 'rs3750390': "", 'rs1624844': "",
        'rs3803390': "", 'rs2293768': "", 'rs9358890': "", 'rs11197835': "", 'rs1806191': "", 'rs7953': "",
        'rs3736757': "", 'rs2940779': "", 'rs7522034': "", 'rs6107027': "", 'rs2275059': "", 'rs3746805': "",
        'rs4953042': "", 'rs3817098': "", 'rs6965201': "", 'rs5998': "", 'rs7259333': "", 'rs1802778': "",
        'rs907157': "", 'rs8064024': "", 'rs3749970': "", 'rs7933089': "", 'rs2292745': "", 'rs1799932': "",
        'rs4078313': "", 'rs2266918': "", 'rs805423': "", 'rs540261': "", 'rs3734586': "", 'rs3753886': "",
        'rs3210635': "", 'rs2294024': "", 'rs3812471': "", 'rs7786497': "", 'rs1128933': "", 'rs4656': "",
        'rs238148': "", 'rs2074265': "", 'rs11274': "", 'rs10069050': "", 'rs3736510': "", 'rs2304891': "",
        'rs9482': "", 'rs1137930': "", 'rs1058486': "", 'rs27529': "", 'rs3177137': "", 'rs1043615': "",
        'rs1054975': "", 'rs1060817': "", 'rs2232818': "", 'rs2273235': "", 'rs11054': "", 'rs2236277': "",
        'rs2293250': "", 'rs3182911': "", 'rs4799': "", 'rs13030': "", 'rs547497': "", 'rs13180': "",
        'rs957448': "", 'rs3108237': "", 'rs164572': "", 'rs2175593': "", 'rs2306641': "", 'rs1594': "",
        'rs7300444': "", 'rs1057908': "", 'rs2152092': "", 'rs2358996': "", 'rs4075325': "", 'rs1057925': ""
      };
  
      const lines = text.split('\n');
  
      for (const line of lines) {
        if (line.startsWith('#')) {
          continue;
        }
        const parts = line.trim().split('\t');
        const snp = parts[0];
        if (jsonSnips.hasOwnProperty(snp)) {
          jsonSnips[snp] = parts[3]; // Se asume que la posición 3 contiene el genotipo
        }
      }
  
      // Verificar que al menos un snip tenga contenido (no sea una cadena vacía)
      const hasNonEmpty = Object.values(jsonSnips).some(value => value.trim() !== "");
      if (!hasNonEmpty) {
        return false;
      }
  
      return jsonSnips;
    } catch (error) {
      return false;
    }
  }
  