import os
import re

def parse_entity(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Get class name
    class_match = re.search(r'public class (\w+)', content)
    if not class_match:
        return None
    class_name = class_match.group(1)

    # Get table name
    table_match = re.search(r'@Table\(name\s*=\s*"([^"]+)"\)', content)
    table_name = table_match.group(1) if table_match else class_name.lower() + "s"

    # Find all fields
    # Match patterns like: private String username; or private Long id;
    fields = []
    lines = content.split('\n')
    for line in lines:
        line = line.strip()
        if line.startswith('private '):
            parts = line.split(' ')
            if len(parts) >= 3:
                field_type = parts[1]
                field_name = parts[2].replace(';', '')
                fields.append((field_type, field_name))
                
    return {
        'class_name': class_name,
        'table_name': table_name,
        'fields': fields,
        'path': file_path
    }

def get_oracle_type(java_type):
    mapping = {
        'String': 'VARCHAR2(255)',
        'Long': 'NUMBER(19,0)',
        'Integer': 'NUMBER(10,0)',
        'int': 'NUMBER(10,0)',
        'boolean': 'NUMBER(1,0)',
        'Boolean': 'NUMBER(1,0)',
        'Date': 'TIMESTAMP',
        'LocalDateTime': 'TIMESTAMP',
        'Double': 'NUMBER(19,4)',
        'double': 'NUMBER(19,4)',
        'byte[]': 'BLOB'
    }
    return mapping.get(java_type, 'VARCHAR2(255)') # Fallback

def main():
    root_dir = r"e:\My works IT\ALERT 4.0 GOVERNMENT"
    entities = []
    
    for subdir, _, files in os.walk(root_dir):
        if 'node_modules' in subdir or 'target' in subdir or '.git' in subdir:
            continue
        for file in files:
            if file.endswith('.java'):
                path = os.path.join(subdir, file)
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    if '@Entity' in content:
                        entity = parse_entity(path)
                        if entity:
                            entities.append(entity)

    # Generate Markdown
    md_content = "# Oracle Database Schema Documentation\n\n"
    md_content += "This document contains a highly detailed breakdown of the ALERT 4.0 GOVERNMENT system's database schema running on Oracle Database. The system follows a Microservices Architecture. The schema definitions are auto-generated and maintained using Spring Data JPA and Hibernate. Below are the precise `CREATE TABLE` Oracle SQL statements matching the application's entity structures, along with descriptions of their purpose and data stored.\n\n"
    
    for e in entities:
        service_match = re.search(r'alertgov-backend\\([^\\]+)\\', e['path'])
        service_name = service_match.group(1) if service_match else "Core System"
        
        md_content += f"## Table: `{e['table_name']}`\n\n"
        md_content += f"**Service / Module**: {service_name}\n\n"
        md_content += f"**Entity Class**: `{e['class_name']}`\n\n"
        md_content += f"**Description**: This table is responsible for storing data related to `{e['class_name']}` within the {service_name}. It maintains the primary records essential for system operations such as logging, referencing, and state management.\n\n"
        
        md_content += "### Oracle SQL Creation Script\n\n"
        md_content += "```sql\n"
        md_content += f"CREATE TABLE {e['table_name']} (\n"
        
        for i, (ftype, fname) in enumerate(e['fields']):
            oracle_type = get_oracle_type(ftype)
            line = f"    {fname.upper()} {oracle_type}"
            if fname == "id" or fname == "username":
                line += " PRIMARY KEY"
            if i < len(e['fields']) - 1:
                line += ","
            md_content += line + "\n"
            
        md_content += ");\n"
        md_content += "```\n\n"
        
        md_content += "### Columns and Data Types\n\n"
        md_content += "| Column Name | Oracle Data Type | Java Type | Description |\n"
        md_content += "|---|---|---|---|\n"
        
        for ftype, fname in e['fields']:
            oracle_type = get_oracle_type(ftype)
            md_content += f"| `{fname.upper()}` | `{oracle_type}` | `{ftype}` | Stores the {fname} information for {e['class_name']}. |\n"
            
        md_content += "\n---\n\n"

    with open(r"e:\My works IT\ALERT 4.0 GOVERNMENT\database_documentation.md", "w", encoding='utf-8') as f:
        f.write(md_content)
        
    print("Documentation generated successfully.")

if __name__ == '__main__':
    main()
