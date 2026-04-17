const fs = require('fs');
const path = require('path');

function splitFile(filePath, styleFileName) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const styleMatch = content.match(/const styles = StyleSheet\.create\({([\s\S]*)\}\);?/);
  
  if (!styleMatch) {
    console.log(`No styles found in ${filePath}`);
    return;
  }
  
  let beforeStyles = content.slice(0, styleMatch.index).trimRight() + '\n';
  const styleObj = styleMatch[0].replace('const styles =', 'export const styles =');
  const importStatement = `import { styles } from './${styleFileName.replace('.ts', '')}';\n`;
  
  // Enlever StyleSheet des imports du composant si ce n'est plus utilisé ? Optionnel, mais on va l'ajouter au fichier de styles.
  
  // Trouver où injecter l'import
  // le plus simple : après la dernière ligne d'import
  const lastImportIndex = beforeStyles.lastIndexOf('import');
  let nextLineAfterImport = 0;
  if (lastImportIndex !== -1) {
    nextLineAfterImport = beforeStyles.indexOf('\n', lastImportIndex) + 1;
  }
  
  const newComponentContent = beforeStyles.slice(0, nextLineAfterImport) + importStatement + beforeStyles.slice(nextLineAfterImport);
  
  const styleFileContent = `import { StyleSheet } from 'react-native';\n\n${styleObj}\n`;
  
  const dir = path.dirname(filePath);
  fs.writeFileSync(path.join(dir, styleFileName), styleFileContent);
  fs.writeFileSync(filePath, newComponentContent);
  console.log(`Refactored ${filePath}`);
}

splitFile('./Dashboard/app/withdraw.tsx', 'withdraw.styles.ts');
splitFile('./Dashboard/src/components/BalanceCard.tsx', 'BalanceCard.styles.ts');
