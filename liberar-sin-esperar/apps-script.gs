/**
 * Base de datos compartida y gratuita para "Liberar sin esperar".
 * Guarda ideas, registros de línea base, referencias y avance del plan
 * en una hoja de Google Sheets. Instrucciones en README.md.
 */
const TABLAS = ['ideas', 'registros', 'referencias', 'plan'];

function hoja_(t) {
  if (TABLAS.indexOf(t) < 0) throw new Error('Tabla no permitida: ' + t);
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(t);
  if (!sh) {
    sh = ss.insertSheet(t);
    sh.appendRow(['id', 'actualizado', 'datos']);
    sh.setFrozenRows(1);
  }
  return sh;
}

function json_(o) {
  return ContentService.createTextOutput(JSON.stringify(o))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  try {
    const sh = hoja_(e.parameter.t);
    const v = sh.getDataRange().getValues();
    const rows = [];
    for (let i = 1; i < v.length; i++) {
      try { rows.push(JSON.parse(v[i][2])); } catch (_) {}
    }
    return json_({ rows: rows });
  } catch (err) {
    return json_({ error: String(err) });
  }
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const b = JSON.parse(e.postData.contents);
    const sh = hoja_(b.t);
    const id = b.action === 'delete' ? b.id : b.record.id;
    const ids = sh.getRange(1, 1, Math.max(1, sh.getLastRow()), 1).getValues();
    let fila = -1;
    for (let i = 1; i < ids.length; i++) {
      if (String(ids[i][0]) === String(id)) { fila = i + 1; break; }
    }
    if (b.action === 'delete') {
      if (fila > 0) sh.deleteRow(fila);
    } else {
      escribir_(sh, fila, b.record);
    }
    return json_({ ok: true });
  } catch (err) {
    return json_({ error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

/* Además del JSON completo, escribe cada campo en su propia columna
   para que RR. HH. pueda leer y filtrar la hoja directamente. */
function escribir_(sh, fila, rec) {
  const enc = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
  Object.keys(rec).forEach(function (k) {
    if (typeof rec[k] === 'object') return;
    if (enc.indexOf(k) < 0) { enc.push(k); sh.getRange(1, enc.length).setValue(k); }
  });
  const row = enc.map(function (h, i) {
    if (i === 0) return rec.id;
    if (i === 1) return new Date();
    if (i === 2) return JSON.stringify(rec);
    const v = rec[h];
    return (v === null || v === undefined || typeof v === 'object') ? '' : v;
  });
  if (fila > 0) sh.getRange(fila, 1, 1, row.length).setValues([row]);
  else sh.appendRow(row);
}
