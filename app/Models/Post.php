<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Post extends Model
{
    use HasFactory;

    protected $fillable = ['title','description','image'];

    public function CreatedAt() : Attribute
    {
        return Attribute::make(
            get: fn($value) => \Carbon\Carbon::parse($value)->diffForHumans()
        );
    }

}
