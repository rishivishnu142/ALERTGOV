import os
import glob
import re

frontend_src = r"E:\My works IT\ALERT 4.0 GOVERNMENT\alertgov-frontend\src"

for root, _, files in os.walk(frontend_src):
    for file in files:
        if file.endswith('.jsx') or file.endswith('.js'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()

            if 'mockData' in content:
                # Find what is imported
                match = re.search(r'import\s+\{([^}]+)\}\s+from\s+[\'"].*?mockData.*?[\'"];?', content)
                if not match: continue
                imports = [i.strip() for i in match.group(1).split(',')]
                
                # 1. Remove the mockData import
                content = re.sub(r'import\s+\{[^}]+\}\s+from\s+[\'"].*?mockData.*?[\'"];?\n?', '', content)
                
                # 2. Add import for useLiveContextData
                depth = filepath.replace(frontend_src, '').count(os.sep) - 1
                rel_path = '../' * depth + 'context/LiveContext' if depth > 0 else './context/LiveContext'
                
                # Check if LiveContext is already imported
                if 'useLiveContextData' not in content:
                    new_import = f"import {{ useLiveContextData }} from '{rel_path.replace(os.sep, '/')}';\n"
                    # Find last import
                    lines = content.split('\n')
                    last_import_idx = -1
                    for i, line in enumerate(lines):
                        if line.startswith('import '): last_import_idx = i
                    if last_import_idx != -1:
                        lines.insert(last_import_idx + 1, new_import.strip())
                    else:
                        lines.insert(0, new_import.strip())
                    content = '\n'.join(lines)
                
                # 3. Inject hook at the top of the component
                # Match "export default function Name() {" or "const Name = () => {"
                
                # Construct the destructuring assignment
                destruct = []
                if 'INCIDENTS' in imports: destruct.append('incidents: INCIDENTS')
                if 'RESOURCES' in imports: destruct.append('resources: RESOURCES')
                if 'DISTRICTS' in imports: destruct.append('districts: DISTRICTS')
                if 'NOTIFICATIONS' in imports: destruct.append('notifications: NOTIFICATIONS')
                if 'ANALYTICS_DATA' in imports: destruct.append('analytics: ANALYTICS_DATA')
                if 'WEATHER_DATA' in imports: destruct.append('weather: WEATHER_DATA')
                if 'APPROVALS' in imports: destruct.append('approvals: APPROVALS')
                
                if not destruct:
                    continue
                    
                hook_line = f"  const {{ {', '.join(destruct)} }} = useLiveContextData();\n"
                
                # Try to find component definition
                # Pattern 1: export default function X(...) {
                content, count = re.subn(r'(export\s+default\s+function\s+[a-zA-Z0-9_]+\s*\([^)]*\)\s*\{)', r'\1\n' + hook_line, content)
                
                if count == 0:
                    # Pattern 2: export function X(...) {
                    content, count = re.subn(r'(export\s+function\s+[a-zA-Z0-9_]+\s*\([^)]*\)\s*\{)', r'\1\n' + hook_line, content)
                
                if count == 0:
                    # Pattern 3: const X = (...) => {
                    content, count = re.subn(r'(const\s+[a-zA-Z0-9_]+\s*=\s*\([^)]*\)\s*=>\s*\{)', r'\1\n' + hook_line, content)
                
                # Remove mockData references that were imported but not replaced 
                # (e.g. if a file had no component but just exported some logic, 
                # this simple script might fail, but most are standard React components)
                
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Refactored: {filepath}")
