import { useState } from "react";

function hexToBytes(hex: string) {
  const clean = hex.startsWith("0x") ? hex.slice(2) : hex;
  if (clean.length % 2 !== 0) throw new Error("Invalid hex");
  const out = new Uint8Array(clean.length / 2);
  for (let i = 0; i < clean.length; i += 2) {
    out[i/2] = parseInt(clean.slice(i, i+2), 16);
  }
  return out;
}

async function decryptToText(cipherBuf: ArrayBuffer, keyHex: string, ivHex: string) {
  const keyBytes = hexToBytes(keyHex);
  const iv = hexToBytes(ivHex);
  const key = await crypto.subtle.importKey("raw", keyBytes, { name: "AES-GCM" }, false, ["decrypt"]);
  const plainBuf = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, cipherBuf);
  const dec = new TextDecoder();
  return dec.decode(plainBuf);
}

async function fetchCid(cid: string) {
  // Use a public gateway; users can replace with their preferred gateway
  const res = await fetch(`https://w3s.link/ipfs/${cid}`);
  if (!res.ok) throw new Error(`Failed to fetch CID: ${res.status}`);
  return await res.arrayBuffer();
}

export default function IpfsDecryptor() {
  const [cid, setCid] = useState<string>("");
  const [keyHex, setKeyHex] = useState<string>("");
  const [ivHex, setIvHex] = useState<string>("");
  const [plaintext, setPlaintext] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleDecrypt = async () => {
    try {
      setLoading(true); setError(""); setPlaintext("");
      const buf = await fetchCid(cid);
      const text = await decryptToText(buf, keyHex, ivHex);
      setPlaintext(text);
    } catch (e:any) {
      setError(e?.message || "Decrypt failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">IPFS Decryptor</h1>
      <p className="text-sm opacity-80">Fetch ciphertext from IPFS (via gateway) and decrypt locally with your AES-GCM key + IV.</p>
      <label className="block text-sm">CID</label>
      <input className="w-full border rounded p-2" placeholder="bafy..." value={cid} onChange={e=>setCid(e.target.value)} />
      <label className="block text-sm">Key (hex)</label>
      <input className="w-full border rounded p-2" placeholder="hex" value={keyHex} onChange={e=>setKeyHex(e.target.value)} />
      <label className="block text-sm">IV (hex)</label>
      <input className="w-full border rounded p-2" placeholder="hex" value={ivHex} onChange={e=>setIvHex(e.target.value)} />
      <button onClick={handleDecrypt} disabled={loading || !cid || !keyHex || !ivHex} className="px-3 py-2 rounded bg-indigo-600 text-white disabled:opacity-50">
        {loading ? "Decrypting..." : "Fetch & Decrypt"}
      </button>
      {error && <div className="p-2 bg-red-100 text-red-800 rounded">{error}</div>}
      {plaintext && (
        <div className="p-3 rounded border">
          <div className="text-sm font-semibold mb-1">Plaintext JSON:</div>
          <pre className="text-xs whitespace-pre-wrap break-all">{plaintext}</pre>
        </div>
      )}
    </div>
  );
}
