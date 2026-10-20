"""Arma la carpeta publicable: copia site/ a out/ y rellena la bitácora de cambios con el historial de git."""
import html
import shutil
import subprocess
from datetime import datetime, timedelta, timezone
from pathlib import Path

# Michoacán no tiene horario de verano desde 2022: UTC-6 fijo.
TZ = timezone(timedelta(hours=-6))
ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "out"


def git(*args):
    return subprocess.run(["git", *args], cwd=ROOT, capture_output=True, text=True, encoding="utf-8", check=True).stdout.strip()


def cambios(limite=20):
    filas = []
    for linea in git("log", f"-{limite}", "--pretty=%ct%x09%s").splitlines():
        ts, asunto = linea.split("\t", 1)
        cuando = datetime.fromtimestamp(int(ts), TZ).strftime("%d/%m %H:%M")
        filas.append(f"    <li><time>{cuando}</time><span>{html.escape(asunto)}</span></li>")
    return "\n".join(filas)


def main():
    if OUT.exists():
        shutil.rmtree(OUT)
    shutil.copytree(ROOT / "site", OUT)
    pagina = OUT / "index.html"
    texto = pagina.read_text(encoding="utf-8")
    texto = texto.replace("<!--CAMBIOS-->", cambios())
    texto = texto.replace("{{SHA}}", git("rev-parse", "--short", "HEAD"))
    texto = texto.replace("{{FECHA}}", datetime.now(TZ).strftime("%d/%m/%Y %H:%M (hora del centro)"))
    pagina.write_text(texto, encoding="utf-8")


if __name__ == "__main__":
    main()
