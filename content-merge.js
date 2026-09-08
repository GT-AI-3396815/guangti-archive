(() => {
  "use strict";

  const batches = [
    ...(window.ARCHIVE_DATA || []),
    ...(window.ARCHIVE_DATA_CORE || []),
    ...(window.ARCHIVE_DATA_SECONDARY || []),
    ...(window.ARCHIVE_DATA_COVERAGE || []),
    ...(window.ARCHIVE_DATA_EXPANSION_A || []),
    ...(window.ARCHIVE_DATA_EXPANSION_B || []),
    ...(window.ARCHIVE_DATA_EXPANSION_C || []),
    ...(window.ARCHIVE_DATA_EXPANSION_D || []),
    ...(window.ARCHIVE_DATA_EXPANSION_E || []),
    ...(window.ARCHIVE_DATA_EXPANSION_F || []),
    ...(window.ARCHIVE_DATA_EXPANSION_K || []),
    ...(window.ARCHIVE_DATA_EXPANSION_L || []),
    ...(window.ARCHIVE_DATA_EXPANSION_M || []),
    ...(window.ARCHIVE_DATA_EXPANSION_O || []),
    ...(window.ARCHIVE_DATA_EXPANSION_P || []),
    ...(window.ARCHIVE_DATA_EXPANSION_T || []),
    ...(window.ARCHIVE_DATA_EXPANSION_U || []),
  ];
  const seen = new Set();
  window.ARCHIVE_DATA = batches.filter((record) => {
    if (!record?.id || seen.has(record.id)) return false;
    seen.add(record.id);
    return true;
  });
})();
