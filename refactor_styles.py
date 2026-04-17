import os
import re

def split_file(file_path, style_file_name):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    match = re.search(r'const styles = StyleSheet\.create\(\{[\s\S]*\}\);?', content)
    if not match:
        print(f"No styles found in {file_path}")
        return

    style_block = match.group(0)
    before_styles = content[:match.start()].rstrip() + '\n'
    
    style_obj = style_block.replace('const styles =', 'export const styles =')
    
    import_statement = f"import {{ styles }} from './{style_file_name.replace('.ts', '')}';\n"
    
    last_import_idx = before_styles.rfind('import ')
    if last_import_idx != -1:
        next_line_after_import = before_styles.find('\n', last_import_idx) + 1
    else:
        next_line_after_import = 0
        
    new_component_content = (
        before_styles[:next_line_after_import] + 
        import_statement + 
        before_styles[next_line_after_import:]
    )
    
    style_file_content = f"import {{ StyleSheet }} from 'react-native';\n\n{style_obj}\n"
    
    dir_name = os.path.dirname(file_path)
    style_path = os.path.join(dir_name, style_file_name)
    
    with open(style_path, 'w', encoding='utf-8') as f:
        f.write(style_file_content)
        
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_component_content)
        
    print(f"Refactored {file_path}")

split_file('./Dashboard/app/withdraw.tsx', 'withdraw.styles.ts')
split_file('./Dashboard/src/components/BalanceCard.tsx', 'BalanceCard.styles.ts')
