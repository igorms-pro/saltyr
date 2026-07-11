// Les tokens SALTYR — mêmes valeurs que les canaux RGB du web (index.css).
// Dark only pour la V1 mobile : l'identité SALTYR reste nocturne.
export const C = {
  ink: '#0a0e14',
  ink2: '#111823',
  ink3: '#0a0f17',
  salt: '#f3f6f8',
  hot: '#ff5a36',
  hotDeep: '#df421f',
  cold: '#1fe3c2',
  coldDeep: '#12b598',
  gold: '#ffc24b',
  goldDeep: '#e0a52e',
  line: '#232e3d',
  muted: '#7d8798',
}

// Styles récurrents (l'équivalent des classes Tailwind partagées)
export const card = {
  backgroundColor: C.ink2,
  borderColor: C.line,
  borderWidth: 1,
  borderRadius: 24,
}

export const mono = {
  fontFamily: 'Menlo',
  textTransform: 'uppercase',
  letterSpacing: 1.6,
  fontSize: 11,
  fontWeight: '600',
}

export const displayBlack = {
  fontWeight: '900',
  textTransform: 'uppercase',
  letterSpacing: -0.5,
  color: C.salt,
}
