import os

def extraer_y_guardar_kt(origen, salida_txt):
    with open(salida_txt, 'w', encoding='utf-8') as salida:
        for ruta_directorio, _, archivos in os.walk(origen):
            for archivo in archivos:
                if archivo.endswith('.java'):
                    ruta_completa = os.path.join(ruta_directorio, archivo)
                    try:
                        with open(ruta_completa, 'r', encoding='utf-8') as kt_file:
                            contenido = kt_file.read()
                            salida.write(f"\n\n===== {ruta_completa} =====\n")
                            salida.write(contenido)
                    except Exception as e:
                        print(f"Error al leer {ruta_completa}: {e}")

    print(f"\n✅ Todos los archivos .kt fueron guardados en: {salida_txt}")

if __name__ == "__main__":
    origen = "/home/desarrollador/Documentos/knarf2003angelo/api-sise/springsise/src/main/java/com/knarf/api"
    salida = "todos_los_archivos_java.txt"  # El archivo se guardará en el mismo directorio que el script

    extraer_y_guardar_kt(origen, salida)
