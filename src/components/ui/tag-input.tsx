"use client";

import { Command as CommandPrimitive } from "cmdk";
import { X } from "lucide-react";
import { KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";
import { Badge } from "./badge";
import { Command, CommandGroup, CommandItem } from "./command";

interface TagInputProps {
  placeholder?: string;
  tags: string[];
  setTags: (tags: string[]) => void;
  disabled?: boolean;
  maxTags?: number; // Nombre maximum de tags
  validateTag?: (tag: string) => boolean; // Fonction de validation personnalisée
  onMaxTagsReached?: () => void; // Callback quand le max est atteint
}

export function TagInput({
  placeholder = "Ajouter...",
  tags,
  setTags,
  disabled = false,
  maxTags = Infinity,
  validateTag = (tag) => tag.length > 0,
  onMaxTagsReached,
}: TagInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // Gestionnaire de focus
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Nettoyage et validation du tag
  const sanitizeTag = useCallback((value: string) => {
    return value.trim().toLowerCase();
  }, []);

  const addTag = useCallback(
    (value: string) => {
      const sanitizedValue = sanitizeTag(value);

      if (tags.length >= maxTags) {
        onMaxTagsReached?.();
        return;
      }

      if (
        sanitizedValue &&
        !tags.includes(sanitizedValue) &&
        validateTag(sanitizedValue)
      ) {
        setTags([...tags, sanitizedValue]);
        setInputValue("");
      }
    },
    [tags, setTags, maxTags, validateTag, onMaxTagsReached, sanitizeTag]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      const input = inputRef.current;
      if (!input) return;

      if (e.key === "Enter") {
        e.preventDefault();
        addTag(input.value);
      } else if (e.key === "Backspace" && !input.value && tags.length > 0) {
        e.preventDefault();
        setTags(tags.slice(0, -1));
      } else if (e.key === "Escape") {
        setShowSuggestions(false);
        input.blur();
      }
    },
    [tags, setTags, addTag]
  );

  const removeTag = useCallback(
    (tagToRemove: string) => {
      setTags(tags.filter((tag) => tag !== tagToRemove));
    },
    [tags, setTags]
  );

  // Ajouter cette nouvelle fonction pour gérer le collage
  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pastedText = e.clipboardData.getData("text");
      const newTags = pastedText
        .split(/[\n,]/) // Sépare par retour à la ligne ou virgule
        .map((tag) => sanitizeTag(tag))
        .filter((tag) => tag && !tags.includes(tag) && validateTag(tag));

      // Vérifier si l'ajout des nouveaux tags ne dépasse pas la limite
      const availableSlots = maxTags - tags.length;
      const tagsToAdd = newTags.slice(0, availableSlots);

      if (tagsToAdd.length > 0) {
        setTags([...tags, ...tagsToAdd]);
        setInputValue("");
      }

      if (newTags.length > availableSlots) {
        onMaxTagsReached?.();
      }
    },
    [tags, setTags, maxTags, validateTag, onMaxTagsReached, sanitizeTag]
  );

  return (
    <Command
      ref={containerRef}
      className="overflow-visible bg-transparent"
      shouldFilter={false}
    >
      <div className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex gap-1 flex-wrap">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="hover:bg-secondary transition-colors"
            >
              {tag}
              <button
                type="button"
                className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    removeTag(tag);
                  }
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onClick={() => removeTag(tag)}
                aria-label={`Supprimer le tag ${tag}`}
              >
                <X className="h-3 w-3 text-muted-foreground hover:text-foreground transition-colors" />
              </button>
            </Badge>
          ))}
          <CommandPrimitive.Input
            ref={inputRef}
            disabled={disabled || tags.length >= maxTags}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            onFocus={() => setShowSuggestions(true)}
            value={inputValue}
            onValueChange={setInputValue}
            placeholder={
              tags.length >= maxTags
                ? `Maximum ${maxTags} tags atteint`
                : placeholder
            }
            className="bg-transparent outline-none placeholder:text-muted-foreground flex-1 min-w-[120px] inline-flex disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
      </div>
      {showSuggestions && (
        <div className="relative mt-2">
          <CommandGroup className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            <CommandItem className="px-2 py-1.5 text-sm">
              Appuyez sur Entrée pour ajouter
            </CommandItem>
          </CommandGroup>
        </div>
      )}
    </Command>
  );
}
